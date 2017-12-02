$(function () {
    /**
     * 初始化布局
     */
    if (__ytF.activeSecondMould) {
        $('.' + __ytF.activeSecondMould).removeClass('hidden').siblings().addClass('hidden');
        __ytF.activeSecondMould = '';
    } else {
        $('.companyIntroduction').removeClass('hidden').siblings().addClass('hidden');
    }
    /**
     *  about一级导航栏页面切换功能
     */
    $('.aboutus-nav-bar li a').unbind('click').click(function () {
        $('.' + $(this).attr('data-value')).removeClass('hidden').siblings().addClass('hidden');
    })
});