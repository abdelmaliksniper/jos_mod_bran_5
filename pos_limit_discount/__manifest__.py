# -*- coding: utf-8 -*-
{
    'name': "POS Limit Discount per Product",

    'summary': """ This module limits discount on product in point of sale interface.
        """,

    'description': """
        
    """,

    'author': "Abdelmalik Yousif",
    'website': "abdelmalik19930@gmail.com",
    'category': 'Generic Modules',
    'version': '1.0',
    'price': 18.0,
    'currency': 'EUR',


    'depends': ['point_of_sale'],


    'data': [
        'views/malik.xml',
        'views/malik_v.xml',
    ],
    'images': [
        'static/description/limit_msg.png',
    ],

    'demo': [
        #'demo/demo.xml',
    ],
    'qweb': [],
    'installable': True,
    'application': False,
    'auto_install': False,
}
