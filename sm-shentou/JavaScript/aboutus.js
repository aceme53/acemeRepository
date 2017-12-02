$(function () {
    $('.companyIntroduction').removeClass('hidden');
    /**
     *  about一级导航栏页面切换功能
     */
    $('.aboutus-nav-bar li a').unbind('click').click(function () {
        $('.' + $(this).attr('data-value')).removeClass('hidden').siblings().addClass('hidden');
    })
});