odoo.define('pos_limit_discount.PosDisc', function(require){
"use strict";


    var models = require('point_of_sale.models');
    var screens = require('point_of_sale.screens');
    var session = require('web.session');
    var Model = require('web.DataModel');
    var core = require('web.core');
    var _t = core._t;
    var limit_val;
    var limit_ch;

    screens.OrderWidget.include({

    mali_cali: function(val) {
        new Model("product.product")
                 .query(["id", "name", "limit_ch", "limit_val"])
                 .filter([['id', '=', val]])
                 .first()
                 .then(function (results){
                      limit_ch = results.limit_ch;
                      limit_val = results.limit_val;
                 });


    },
    play_wav: function() {
        var src = '';
        src = "/pos_limit_discount/static/src/sounds/zt.wav";
        $('body').append('<audio src="'+src+'" autoplay="true"></audio>');
    },
    set_value: function(val) {
    var self = this;
    try {
        var order = this.pos.get_order();
        var mode = this.numpad_state.get('mode');
        if (order.get_selected_orderline()) {
            var mode = this.numpad_state.get('mode');
            if( mode === 'quantity'){
                order.get_selected_orderline().set_quantity(val);
            }else if( mode === 'discount'){
                this.mali_cali(order.get_selected_orderline().get_product().id);
                if(limit_ch === true && val > limit_val){
                    self.play_wav();
                    self.gui.show_popup('confirm',{
                    'title': _t('Exceeded Discount Limit!'),
                    'body':  _t("Sorry,"+val+"% Is not Allowed!"+"\n"+"Maximum Discount On This Product Is: "+limit_val+"%"),
                    confirm : function() {
                            order.get_selected_orderline().set_discount(limit_val);
                     },
                     cancel : function() {
                            order.get_selected_orderline().set_discount(limit_val);
                     },});
                }
                else{
                    order.get_selected_orderline().set_discount(val);
                }
            }else if( mode === 'price'){
                order.get_selected_orderline().set_unit_price(val);
            }
    	}

    }
    catch(err) {

    }




    },



    });


});
