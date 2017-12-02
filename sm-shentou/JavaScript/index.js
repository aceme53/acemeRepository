$(function () {
    window.__ytF = {
        backToHome: function () {
            $(".index-container").load("../HTML/home.html");
        },
        returnToTop: function () {
            window.returnF = {
                moveArr: [],
                speed: 10,
                returnTop: function () {
                    returnF.RTtimer = setInterval(function () {
                        returnF.moveArr.push(document.body.scrollTop - returnF.speed);
                        if (returnF.moveArr[returnF.moveArr.length - 1] === returnF.moveArr[returnF.moveArr.length - 2]) {
                            returnF.moveArr = [];
                            clearInterval(returnF.RTtimer);
                            delete  window.returnF;
                        } else {
                            window.scrollTo(0, document.body.scrollTop - returnF.speed);
                        }
                    }, 1);
                }
            };
            window.returnF.returnTop();
        }
    };
    window.__ytF.backToHome();
    /**
     *  hover 子菜单显示/隐藏
     */
    $('.nav-bar li').hover(function () {
            var self = this;
            if ($(self).find('.sub-header-bottom-bar').length && $(self).find('.sub-header-bottom-bar').css('display') === 'none') {
                $('.sub-header-bottom-bar').hide();//隐藏其它二级菜单栏目
                $(self).find('.sub-header-bottom-bar').fadeIn();
            }
        },
        function () {
            var self = this;
            var position;
            var getPosX = function (e) {
                position = e;
            };
            document.addEventListener('mousemove', getPosX);
            if ($(self).find('.sub-header-bottom-bar').length) {
                setTimeout(function () {
                    //鼠标移开一秒后隐藏子菜单
                    var $ulDom = $(position.target).parent().parent();
                    document.removeEventListener('mousemove', getPosX);
                    if ($ulDom.length && $ulDom[0].tagName === "UL" && ($ulDom.hasClass('sub-nav-bar') || $ulDom.hasClass('nav-bar') )) return;
                    $(self).find('.sub-header-bottom-bar').fadeOut();
                }, 1000)
            }
        });
    /**
     *  index头部一级导航栏页面切换功能
     */
    $('.header-bottom-bar li a').unbind('click').click(function () {
        var dVal = $(this).attr('data-value');
        if (dVal) {
            //重新引入html和js
            $('script[src = "../JavaScript/' + dVal + '.js"]').remove();
            var sDom = document.createElement('script');
            sDom.setAttribute('type', 'text/javascript');
            sDom.setAttribute('src', '../JavaScript/' + dVal + '.js');
            document.body.appendChild(sDom);
            $(".index-container").load("../HTML/" + dVal + ".html");
        }
    })
});
