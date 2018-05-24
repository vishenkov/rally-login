var APP_BUILD_DATE = "Fri Apr 01 2016 09:03:52 GMT-0600 (MDT)";
var CHECKSUM = 8167943253;

/**
 * A link that pops up a version dialog box
 */

Ext.define('Rally.technicalservices.InfoLink', {
  extend: 'Rally.ui.dialog.Dialog',
  alias: 'widget.tsinfolink',

  /**
   * @cfg {String} informationHtml
   * Additional text to be displayed on the popup dialog (for exmaple,
   * to add a description of the app's use or functionality)
   */
  informationHtml: null,

  /**
   * 
   * cfg {String} title
   * The title for the dialog box
   */
  title: "Build Information",

  defaults: {
      padding: 0,
      margin: 0
  },

  closable: true,

  draggable: true,

  autoShow: true,

  width: 350,

  initComponent: function() {
      var id = Ext.id(this);
      this.title = "<span class='icon-help'> </span>" + this.title;
      this.callParent(arguments);
  },

  _generateChecksum: function(string) {
      var chk = 0x12345678,
          i;
      string = string.replace(/var CHECKSUM = .*;/, "");
      string = string.replace(/\s/g, ""); //Remove all whitespace from the string.

      for (i = 0; i < string.length; i++) {
          chk += (string.charCodeAt(i) * i);
      }

      return chk;
  },

  _checkChecksum: function(container) {
      var deferred = Ext.create('Deft.Deferred');
      console.log("_checkChecksum", container);
      var me = this;

      Ext.Ajax.request({
          url: document.URL,
          params: {
              id: 1
          },
          success: function(response) {
              text = response.responseText;
              if (CHECKSUM) {
                  if (CHECKSUM !== me._generateChecksum(text)) {
                      console.log("Checksums don't match!");
                      deferred.resolve(false);
                      return;
                  }
              }
              deferred.resolve(true);
          }
      });

      return deferred.promise;
  },

  afterRender: function() {
      var app = Rally.getApp();

      if (!app.isExternal()) {

          this._checkChecksum(app).then({
              scope: this,
              success: function(result) {
                  if (!result) {
                      this.addDocked({
                          xtype: 'container',
                          cls: 'build-info',
                          padding: 2,
                          html: '<span class="icon-warning"> </span>Checksums do not match'
                      });
                  }
              },
              failure: function(msg) {
                  console.log("oops:", msg);
              }
          });
      } else {
          this.addDocked({
              xtype: 'container',
              cls: 'build-info',
              padding: 2,
              html: '... Running externally'
          });
      }
      this.callParent(arguments);
  },

  beforeRender: function() {
      var me = this;
      this.callParent(arguments);

      if (this.informationHtml) {
          this.addDocked({
              xtype: 'component',
              componentCls: 'intro-panel',
              padding: 2,
              html: this.informationHtml
          });
      }

      this.addDocked({
          xtype: 'container',
          cls: 'build-info',
          padding: 2,
          html: "This app was created by the Rally Technical Services Team."
      });

      if (APP_BUILD_DATE) {
          this.addDocked({
              xtype: 'container',
              cls: 'build-info',
              padding: 2,
              html: 'Build date/time: ' + APP_BUILD_DATE
          });
      }
  }
});

Ext.define('Rally.technicalservices.Logger', {
  constructor: function(config) {
      Ext.apply(this, config);
  },
  log: function(args) {
      var timestamp = "[ " + Ext.util.Format.date(new Date(), "Y-m-d H:i:s.u") + " ]";
      //var output_args = arguments;
      //output_args.unshift( [ "[ " + timestamp + " ]" ] );
      //output_args = Ext.Array.push(output_args,arguments);

      var output_args = [];
      output_args = Ext.Array.push(output_args, [timestamp]);
      output_args = Ext.Array.push(output_args, Ext.Array.slice(arguments, 0));

      window.console && console.log.apply(console, output_args);
  }

});


Ext.define('CustomApp', {
  extend: 'Rally.app.App',
  componentCls: 'app',
  autoScroll: false,
  logger: new Rally.technicalservices.Logger(),
  defaults: {
    margin: 10
  },
  config: {
    defaultSettings: {
      // selectedPortfolioType: 'PortfolioItem/Initiative',
      selectedPortfolioType: 'PortfolioItem/Feature',
      defectQuery: ''
    }
  },
  integrationHeaders: {
      name: "portfolio-item-defects"
  },

  launch: function() {
    var store = this._getPortfolioItemStore();
    this._createComboBox(store);
  },


  _getPortfolioItemStore: function() {
    console.log(this.getSetting('selectedPortfolioType'));
    var model = this.getSetting('selectedPortfolioType');
    var store = Ext.create('Rally.data.wsapi.Store', {
      model: model,
      fetch: ['ObjectID', 'FormattedID', 'Name'],
      autoLoad: true,
      remoteFilter: true,
      sorters: [{
          property: 'FormattedID',
          direction: 'ASC'
      }]
    })
    // store.on('load', function(records, operation, success) {
    //   console.log('PROFILE STORE LOADED:', records, operation, success);
    // }, this);
    return store;
  },


  _createComboBox: function(store) {
    this.add({
      xtype: 'rallycombobox',
      itemId: 'portfolio-combobox',
      store: store,
      fieldLabel: 'Portfolio Feature',
      allowNoEntry: true,
      minChars: 1,
      noEntryValue: null,
      noEntryText: '-- All Portfolio Defects --',
      margin: 0,
      valueField: 'ObjectID',
      displayField: 'FormattedID',
      queryMode: 'remote',
      typeAhead: true,
      triggerAction: 'all',
      filterProperties: ['Name', 'FormattedID'],
      width: 400,
      listeners: {
        ready: this._comboBoxReady,
        select: this._comboBoxSelect,
        beforequery: this._comboBoxBeforeQuery,
        scope: this
      },
      listConfig: {
        itemTpl: '<tpl if="Name">{FormattedID}: {Name}<tpl else>{FormattedID}</tpl>'
    },
      fieldCls: 'pi-selector',
      displayTpl: '<tpl for=".">' +
          '<tpl if="Name">{[values["FormattedID"]]}: {[values["Name"]]}' +
          '<tpl else>{[values["FormattedID"]]}</tpl>' +
          '<tpl if="xindex < xcount">,</tpl>' +
          '</tpl>'
    });
  },


  _comboBoxReady: function() {
    this._createDefectStore();
  },


  _comboBoxSelect: function() {
    this.defectStore.clearFilter(true);
    this._updateDefectFilters();
    console.log('SELECT FILTERS', this.defectFilters);

    if (this.defectFilters.length) {
      this.defectStore.filter(this.defectFilters);
    } else {
      this.defectStore.load();
    }
  },

  _comboBoxBeforeQuery: function(queryPlan) {
    var cb = this.down('#portfolio-combobox');
    var value = cb.getValue();
    console.log('COMBOBOX VALUE', value);
    queryPlan.query = !value ? '' : '((FormattedID contains "'+ value +'") OR (Name contains "' + value + '"))';
    return queryPlan;
  },

  _updateDefectFilters: function() {
    var oIDFilter, baseFilter, initiativeFilter;
    var query = this.getSetting('defectQuery');
    // console.log('QUERY', query);
    var settingsProfile = this.getSetting('selectedPortfolioType');
    var isInitative = settingsProfile !== 'PortfolioItem/Feature';

    var portfolioItemObjectID = this.down('#portfolio-combobox').getRecord().get('ObjectID');
    console.log('portfolio-combobox ObjectID', portfolioItemObjectID);

    baseFilter = query.length ? Rally.data.wsapi.Filter.fromQueryString(query) : null;
    if (isInitative) {
      initiativeFilter = Ext.create('Rally.data.wsapi.Filter', {
        property: 'Requirement.Feature.Parent',
        operator: '!=',
        value: null
      });
      console.log('Initiative filter', initiativeFilter.toString());
    }
    if (portfolioItemObjectID) {
      oIDFilter = Ext.create('Rally.data.wsapi.Filter', {
          property: isInitative ? 'Requirement.Feature.Parent.ObjectID' : 'Requirement.Feature.ObjectID',
          operator: '=',
          value: portfolioItemObjectID
      });
    }

    this.defectFilters = _.filter([baseFilter, initiativeFilter, oIDFilter], function(filter) {
      return !!filter;
    });
  },

  _createDefectStore() {
    var me = this;
    this._updateDefectFilters();

    Ext.create('Rally.data.wsapi.TreeStoreBuilder').build({
      models: ['Defect'],
      fetch: ['Name', 'State', 'Severity', 'Priority', 'OpenedDate', 'Project', 'Requirement', 'Tasks', 'Owner', 'Tags'],
      // autoLoad: true,
      enableHierarchy: true,
      remoteSort: true,
      remoteFilter: true,
      filters: console.log('INIT FILTERS', this.defectFilters) || this.defectFilters,
      sorters: [{
        property: 'Name',
        direction: 'ASC'
      }],
      listeners: {
        load: this._defectStoreLoaded,
        scope: this
      }
    }).then({
      success: function(store) {
        me.defectStore = store;
        me._createGrid();
      },
      failure: function(msg) {
        me._showError(msg);
      }
    })
  },


  _defectStoreLoaded: function(records, operation, success) {
    console.log('DEFECT STORE LOADED:', records, operation, success);
    // console.log('DEFECT STORE LOADED::GRID:', this.down('#defect-grid'));

    // for defect-grid plugins
    this.down('#defect-grid').gridConfig.storeConfig.filters = this.defectFilters;
  },


  _createGrid: function() {
    // console.log('gridScope: defectStore', this.defectStore);
    var me = this;
    var context = this.getContext();
    // console.log('IN GRID (this), (context)', this, context);
    var modelNames = ['defect'];

    this.add({
      xtype: 'rallygridboard',
      itemId: 'defect-grid',
      modelNames: modelNames,
      context: this.getContext(),
      margin: '0 0 0 0',
      toggleState: 'grid',
      stateful: false,

      plugins: [
        {
          ptype: 'rallygridboardinlinefiltercontrol',
          headerPosition: 'right',
          inlineFilterButtonConfig: {
            stateful: true,
            stateId: context.getScopedStateId('defect-grid-filter'),
            modelNames: modelNames,
          }
        }, {
          ptype: 'rallygridboardfieldpicker',
          headerPosition: 'right',
          modelNames: modelNames,
          stateful: true,
          stateId: context.getScopedStateId('defect-grid-columns')
        }, {
          ptype: 'rallygridboardactionsmenu',
          menuItems: [{
            text: 'Export to Csv',
            handler: function() {
              var grid = this.down('#defect-grid').getGridOrBoard();
              // console.log('here');
              // console.log(grid);
              window.location = Rally.ui.gridboard.Export.buildCsvExportUrl(grid);
            },
            scope: this
          }],
          buttonConfig: {
            iconCls: 'icon-export',
            margin: '3, 43, 0, 0'
          }
        }],

      gridConfig: {
        store: this.defectStore,
        storeConfig: {
          filters: this.defectFilters,
        },
        columnCfgs: [
          'Name', 'State', 'Severity', 'Priority', 'OpenedDate', 'Project', 'Requirement', 'Tasks', 'Owner',
          {
            dataIndex: 'Tags',
            text: 'Tags',
            sortable: true,
            editor: null,
            doSort: function(state) {
              console.log('in Tags doSort');
              me.defectStore.remoteSort = false;
              me.defectStore.sort([{
                direction: state,
                sorterFn: function(v1, v2){
                  console.log('v1',v1);
                  console.log('v2',v2);
                  // Keeping empty Tags down
                  if (v1.data.Tags.Count === 0) return state === 'ASC' ? 1 : -1;
                  if (v2.data.Tags.Count === 0) return state === 'ASC' ? -1 : 1;
                  if (v1.data.Tags.Count === 0 && v2.data.Tags.Count === 0) return 0;

                  var name1 = v1.data.Tags._tagsNameArray.length ? v1.data.Tags._tagsNameArray[0].Name : '';
                  var name2 = v2.data.Tags._tagsNameArray.length ? v2.data.Tags._tagsNameArray[0].Name : '';
                  // console.log('name1', name1, 'name2', name2);
                  return name1 === name2 ? 0 : (name1 > name2 ? 1 : -1);
                }
              }]);
              me.defectStore.remoteSort = true;
            }
          }
        ],
      },

      height: me.getHeight() - 20
    })
  },


  _showError: function(msg) {
    Rally.ui.notify.Notifier.showError({
        message: msg
    });
  },

  // ==== SETTINGS ====
  getSettingsFields: function() {
    var helper = [{
        name: 'selectedPortfolioType',
        xtype: 'rallycombobox',
        labelAlign: 'right',
        labelWidth: 175,
        allowBlank: false,
        autoSelect: false,
        fieldLabel: 'Selected Portfolio Item Type',
        storeConfig: {
          model: Ext.identityFn('TypeDefinition'),
          sorters: [{ property: 'DisplayName' }, { property: 'Owner' }],
          fetch: ['DisplayName', 'ElementName', 'TypePath', 'Parent', 'UserListable', 'Owner'],
          filters: [{
              property: 'TypePath',
              operator: 'contains',
              value: 'PortfolioItem/'
          }],
          autoLoad: false,
          remoteSort: false,
          remoteFilter: true
        },
        displayField: 'DisplayName',
        valueField: 'TypePath'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Defect Query',
        labelAlign: 'right',
        labelWidth: 175,
        name: 'defectQuery',
        anchor: '100%',
        cls: 'query-field',
        margin: '0 70 0 0',
        plugins: [{
                ptype: 'rallyhelpfield',
                helpId: 194
            },
            'rallyfieldvalidationui'
        ],
        validateOnBlur: false,
        validateOnChange: false,
        validator: function(value) {
            try {
                if (value) {
                    Rally.data.wsapi.Filter.fromQueryString(value);
                }
                return true;
            } catch (e) {
                return e.message;
            }
        }
    }];
    // this.logger.log('this in settings', helper);
    return helper;
  },
  
  getOptions: function() {
    return [{
        text: 'About...',
        handler: this._launchInfo,
        scope: this
    }];
},

  _launchInfo: function() {
      if (this.about_dialog) {
          this.about_dialog.destroy();
      }
      this.about_dialog = Ext.create('Rally.technicalservices.InfoLink', {});
  },

  isExternal: function() {
      return typeof(this.getAppId()) == 'undefined';
  },

  //onSettingsUpdate:  Override
  onSettingsUpdate: function(settings) {
      this.logger.log('onSettingsUpdate', settings);
      this.launch();
      // this.down('#portfolio-combobox').bindStore(this._getPortfolioItemStore());
  }
});
