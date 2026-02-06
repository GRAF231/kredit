respondToVisibility = function (element, callback, parent = null) {
    var options = {
        root: parent,
        threshold: 1,
    }

    var observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            callback(entry.isIntersecting > 0);
        });
    }, options);

    observer.observe(element);
}

function copyToClipboard(textArea) {

    textArea.focus();
    textArea.select();

    document.execCommand('copy');

}

function popup(el) {

    $(".document").toggleClass("popup-active", true);
    $(".js-popup").toggleClass("active", false);

    $("[data-popup]").removeClass("active");

    $(el).toggleClass("active", true).scrollTop(0);
    return;

}

function popupClose() {

    $(".js-popup").toggleClass("active", false);
    $(".document").toggleClass("popup-active", false);
    $("[data-popup]").removeClass("active");

    return;

}

$(".js-popup-close").click(function (e) {
    e.preventDefault();
    popupClose();
    return;
});


$("[data-popup]").click(function (e) {

    e.preventDefault();

    var el = $(this).data("popup");

    if ($(this).hasClass("active")) {
        popupClose();

        $(this).removeClass("active");

    } else {

        popup(el);
        $(this).addClass("active");

    }

    return;


});
$(".main-menu li:first-child a").click(function (e) {
    e.preventDefault();
    $(".main-menu").toggleClass("open");
    //return;
});

$("#popup-nav").html(
    $("#navbar-main").html()
);

$(".js-expand").each(function (i) {

    var box = $(this),
        button = box.find(".js-expand-button");

    button.click(function (e) {
        e.preventDefault();
        box.toggleClass("active"); //.siblings().removeClass("active");
    });

});

$(".js-show-password").each(function (i) {

    var box = $(this).closest(".textfield").find("input"),
        currentType = box.attr("type");

    $(this).on("click", function (e) {
        e.preventDefault();
        
        var t = box.attr("type");
        
        box.attr("type", t == currentType ? "text" : currentType);
        
    });

});

$(".js-tab").each(function (i) {
    $(this).click(function (e) {

        var pane = $(this).data("pane");

        e.preventDefault();

        $(this).addClass("current").siblings().removeClass("current");
        $(pane).addClass("current").siblings().removeClass("current");

    });
});

$(".js-selector").each(function (i) {
    var select = $(this),
        dd = select.find(".js-selector-list"),
        button = select.find(".js-selector-toggle"),
        holderText = select.find(".js-selector-value-text"),
        holderNum = select.find(".js-selector-value-num"),
        holder = select.find(".js-selector-value");

    if (!dd.hasClass("selector-list__inner")) {
        $("body").prepend(dd);
    } else {

        dd.insertAfter(select);

    }

    button.click(function (e) {
        e.preventDefault();
        e.stopPropagation();

        var pos = select.offset(),
            pl = pos.left,
            pt = pos.top + select.outerHeight();

        if (!dd.hasClass("selector-list__inner")) {

            dd.css({
                left: pl,
                top: pt,
                "max-width": select.outerWidth()
            });

        }

        if (select.hasClass("active")) {
            $(".js-selector").removeClass("active");
            $(".js-selector-list").removeClass("active");
        } else {
            $(".js-selector").removeClass("active");
            $(".js-selector-list").removeClass("active");
            select.addClass("active");
            dd.addClass("active");
        }


    });

    dd.find(".js-selector-option").click(function (e) {
        e.stopPropagation();

        var v = $(this).attr("data-value");
        var n = $(this).attr("data-num") || null;

        if (v) {
            holder.val(v);
            holderText.text(v);
        }
        if (n) {
            holderNum.text("(" + n + ")");
        } else {
            holderNum.text(null);
        }

        dd.find(".active").removeClass("active");
        $(this).addClass("active");
        dd.removeClass("active");
        select.removeClass("active");
        return;
    });

});

$("html").on("click", function () {
    $(".js-selector").removeClass("active");
    $(".js-selector-list").removeClass("active");
});

$(window).on("resize", function () {


    $(".js-selector").removeClass("active");
    $(".js-selector-list").removeClass("active");

});

$(".datatable .checkbox-container").each(function (i) {

    var el = $(this),
        input = el.find(".checkbox-input");

    input.on("change", function () {

        el.toggleClass("checked");

    });

});

$(".checkbox-input[data-checkbox-group]").each(function (i) {

    var gId = $(this).data("checkbox-group"),
        button = $(".checkbox-input[data-checkbox-all=" + gId + "]"),
        group = $(".checkbox-input[data-checkbox-group]").filter(function (j) {
            return $(this).data("checkbox-group") == gId;
        });

    $(this).on("change", function (e) {

        var checked = group.filter(function (j) {

            return $(this).prop("checked");

        });

        button.prop("checked", checked.length == group.length);

    });

});

$(".checkbox-input[data-checkbox-all]").each(function (i) {

    var gId = $(this).data("checkbox-all"),
        group = $(".checkbox-input[data-checkbox-group]").filter(function (j) {
            return $(this).data("checkbox-group") == gId;
        });

    $(this).on("change", function (e) {

        var state = $(this).prop("checked");

        group.each(function (j) {

            $(this).prop("checked", state);
            $(this).closest(".checkbox-container").toggleClass("checked", state);

        });

    });

});

var currentAppHeight = 0;

const appVars = () => {
    document.documentElement.style.setProperty('--app-height', window.innerHeight + "px");
    document.documentElement.style.setProperty('--headroom-height', $("#headroom").innerHeight() + "px");

    if (window.innerWidth >= 1024) {

        currentAppHeight = window.innerHeight;

    }

}


$(function () {

    appVars();

    $(".tooltip").tooltipster({
        plugins: ['follower'],
        delay: 0,
        animationDuration: 0,
        distance: 0,
    });

    $.each($(".scrollbox"), function (i) {

        var mb = new MiniBar(this, {

            barType: "default",
            minBarSize: 0,
            alwaysShowBars: true,
            scrollX: false,
            scrollY: true,
            navButtons: false,
            observableItems: ".textfield-input",

        });

        $(this).find(".mb-content").animate({
            scrollTop: 1
        }, 100).animate({
            scrollTop: 0
        }, 100);

        
        $(this).find("textarea").on("input focus keyup", function(){
            
            mb.update();
            
        });
        
    });
    
    var hbi = $("#nav-container");
    
    $(".s1-3 .datatable").each(function(i){
        
        var dt = $(this);
        var dtt = dt.offset().top;
        
        var fh = $("<table>", {class: "datatable-fixed-header"});
        
        dt.find("th").each(function(j){
            
            $(this).css({
                
                "min-width": $(this).outerWidth(),
                
            });
            
        });
        
        var dh = dt.find("thead").clone(true, true);
        
        dh.appendTo(fh);
        
        fh.appendTo(dt);
        
        
        $(window).on("scroll", function () {
           
            var st = $(this).scrollTop() + hbi.height() - dtt;
            
            fh.css({
                "transform": "translateY("+( st > 0 ? st : 0 )+"px)" ,
            });
                
            
        });
        
    });


    $("textarea").each(function () {

        $(this).on('input focus', function () {
            t = $(this);
            t.css({
                'height': 0,
                //'min-height': 0,
            });
            t.css({
                'height': t[0].scrollHeight + 'px'
            });
            
            
        }).trigger('input');

    });


    $(window).on("resize", function () {

        if (window.innerWidth >= 1024) {

            appVars();

        } else {

            if (currentAppHeight) {
                currentAppHeight = 0;
                appVars();
            }

        }


    });

    $(".mb-content").on("scroll", function () {

        $(".js-selector:not(.selector__inner)").removeClass("active");
        $(".js-selector-list:not(.selector-list__inner)").removeClass("active");

    });

    $(window).trigger("resize");

    $(window).on("scroll", function () {

        $(".js-selector:not(.selector__inner)").removeClass("active");
        $(".js-selector-list:not(.selector-list__inner)").removeClass("active");
        //$(".header").toggleClass("active", $(window).scrollTop() > 0);

    }).trigger("scroll");


    var imgLoad = $(".document").imagesLoaded(),
        imgLen = $("img").length,
        imgLoadedNum = 0,
        perc = 0;

    imgLoad.always(function (instance) {

        if ($(".document").hasClass("loading")) {

            $(".document").removeClass("loading");

        }






    }).progress(function (instance, image) {

        if (imgLen) {

            imgLoadedNum++;

        }

    });


});
