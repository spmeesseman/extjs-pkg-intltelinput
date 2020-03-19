Ext.define('Ext.ux.IntlPhoneDropdown', 
{
    extend: 'Ext.form.field.Base',
    xtype: 'intlphonedropdown',

    requires: [
    ],
       
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
        this.inputId = 'intltelinput-el-' + (Ext.csi.view.common.IntlPhoneDropdown.idCounter++).toString();
    },

    listeners:
    {
        afterrender: function(cmp, eopts)
        {
            var input = document.querySelector('#' + cmp.inputId);
            if (input) {
                window.intlTelInput(input);
            }
            else {
                console.error('Could not find intltelinput element');
            }
        }
    }
});
