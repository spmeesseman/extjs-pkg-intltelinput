Ext.define('Ext.csi.form.field.IntlPhone', 
{
    extend: 'Ext.form.field.Text',
    xtype: 'intlphonefield',

    requires: [
    ],
       
    inputWrapCls: undefined,        // let the intl-tel-field do its own input field styling
    inputWrapFocusCls: undefined,   //
    inputWrapInvalidCls: undefined, //

    fieldLabel: 'Phone Number',
    tooltip: 'Select your country and phone numnber.  Your country code will be automatically determined',
    inputId: 'intltelinput',
    inputType: 'tel',
    
    statics:
    {
        idCounter: 0
    },

    initComponent: function()
    {
        this.callParent(arguments);
        //
        // Dyanmically set the input id so we can have multiple components rendered at the same time
        //
        this.inputId = 'intltelinput-el-' + (Ext.csi.form.field.IntlPhone.idCounter++).toString();
    },

    listeners:
    {
        afterrender: function(cmp, eopts)
        {
            //
            // Should be able to find the component...
            //
            var input = document.querySelector('#' + cmp.inputId);
            if (input) 
            {
                var options =
                {
                    preferredCountries: ["us", "gb"],
                    utilsScript: '/resources/server/utils.js'
                };
                //
                // Initialize the underlying control/field
                //
                window.intlTelInput(input);
                //
                // The wrapper does not fill the width of the value part of the field
                // Force outer div wrapper to 100% width
                //
                var wrap = document.getElementsByClassName('iti');
                if (wrap && wrap[0])
                {   //
                    // No way of knowing whicch is which if multiple components are rendered,
                    // so just style everything found
                    //
                    for (var w in wrap) {
                        if (wrap[w] && wrap[w].style) {
                            wrap[w].style.width = '100%';
                        }
                    }
                }
            }
            else {
                console.error('Could not find intltelinput element');
            }
        }
    },


    transformRawValue: Ext.identityFn,


    getRawValue: function() {
        var me = this,
            v = (me.inputEl ? me.inputEl.getValue() : Ext.valueFrom(me.rawValue, ''));

        me.rawValue = v;

        return v;
    },


    setRawValue: function(value) 
    {
        var me = this,
            rawValue = me.rawValue;

        if (!me.transformRawValue.$nullFn) {
            value = me.transformRawValue(value);
        }

        value = Ext.valueFrom(value, '');

        if (rawValue === undefined || rawValue !== value) {
            me.rawValue = value;

            // Some Field subclasses may not render an inputEl
            if (me.inputEl) {
                me.bindChangeEvents(false);
                me.inputEl.dom.value = value;
                me.bindChangeEvents(true);
            }
        }

        if (me.rendered && me.reference) {
            me.publishState('rawValue', value);
        }

        return value;
    }

});
