(function () {

    'use strict';

    angular.module('mainApp', ['kendo.directives'])
        .component('ssvSiSchedularView',
        {
            templateUrl: 'ssv-si-schedular-view.component.html',
            controller: SchedularCtrl

        });

    ///TODO http service call and other parameter need to inject
    SchedularCtrl.$inject = ['$http', '$timeout', '$rootScope'];

    function SchedularCtrl($http, $timeout, $rootScope) {

        var vm = this;
        vm.$onInit = onInit;
        vm.$onDestroy = onDestroy;

        vm.Calculation = {
            ssvmethod: '',
            siteCount: '',
            firstSSV: '',
            lastSSV: '',
            ssvStartDate: '',
            ssvRate: '',
            ssvSitesPer: ''

        };

        function onInit() {
            vm.ssvMethod = "ssvSpread";
            vm.ssvSitesPer = "M";
            vm.ssvSpreadShow = true;

            vm.siMethod = "siMinMaxSSU";
            vm.siSitesPer = "M";
            vm.siMinMaxSsuShow = true;
            vm.siRateShow = false;
            vm.siEndDateShow = false;
            vm.initialSSVCalculation = false;
            vm.initialSICalculation = false;

        }
        function onDestroy() {


        }
        vm.ssvSpread = function () {
            vm.ssvSpreadShow = true;
        };
        vm.ssvRates = function () {
            vm.ssvSpreadShow = false;
        };
        vm.siMinMax = function () {
            vm.siMinMaxSsuShow = true;
            vm.siRateShow = false;
        };
        vm.siRates = function () {
            vm.siRateShow = true;
            vm.siMinMaxSsuShow = false;
        };
        vm.siEndDate = function () {
            vm.siRateShow = false;
            vm.siMinMaxSsuShow = false;
        };
        vm.ssvCalculate = function () {

            vm.initialSICalculation = true;
            vm.Calculation.ssvmethod = vm.ssvMethod;
            vm.Calculation.siteCount = vm.site;
            vm.Calculation.firstSSV = vm.firstSSV;
            vm.Calculation.lastSSV = vm.lastSSV;
            vm.Calculation.ssvStartDate = vm.ssvStartDate;
            vm.Calculation.ssvRate = vm.ssvRate;
            vm.Calculation.ssvSitesPer = vm.ssvMethod != "ssvSpread" ? vm.ssvSitesPer : vm.Calculation.ssvSitesPer;

            console.log(vm.Calculation);
        };

       
        vm.xData = [];
        vm.strdate = new Date();
        var dataSample ={};

        vm.showSites = function () {
            vm.initialSSVCalculation = true;
            
            var i = 1;
            var x = 0;
            vm.xData = [];
            for (i = 1; i <= vm.site; i++) {
                vm.xData.push({ id: i ,SSVDate:''});
            }

            var dataSample = new kendo.data.DataSource({
                autoSync:true,
                transport: {
                    read: function (e) {
                        e.success(vm.xData);

                    },

                }
            })  ;
            vm.mainGridOptions = {
                dataSource: dataSample,
                sortable: true,
                dataBound: dataRendered,
                 schema: {

                    model: {
                        fields: {
                            id: {
                                editable: false,
                                nullable: true
                            },
                            SSVDate: {
                                editable: true,
                            },
                            SSU: {
                                editable: false,
                            },
                            SIDate: {
                                editable: true,
                            }
                           
                        }
                    }
                },
                columns: [

                    { field: "id", title: 'Site ID', width: 40 },
                    {
                        field: "SSVDate",
                        title: "SSV Date",

                        width: 125,
                        editable: true,
                        template: `<input  k-ng-model="dataItem.SSVDate"  k-on-change="$ctrl.show(dataItem.SSVDate)"   k-format="'dd MMM yyyy'" kendo-date-picker name="SSV"  style="width:75%"  /><button class="fa fa-unlock-alt" style="border:none; background-color:white;" ></button>`,
                    },
                    {
                        field: "SSU",
                        title: "SSU",

                        width: 40

                    },
                    {
                        field: "SIDate",
                        title: "SI Date",
                        // template: '<span>#= data.SIDate#</span>',
                        template: `<input k-format="'dd MMM yyyy'" kendo-date-picker name="SSV"  style="width:75%"  /><button class="fa fa-unlock-alt" style="border:none; background-color:white;" ></button>`,
                        editable: true,
                        editor: customBoolEditor,
                        width: 125

                    }
                ]
               
            };
              
        vm.show=function(dataItem){
          //console.log(dataItem);
          //console.log(vm.SSVDate);
          alert(dataItem);
          
        };



            function dataRendered(e) {
            //     var grid = event.sender;
            //     var ds = grid.dataSource;
            //    console.log(ds._view);
            e.sender.dataSource.view().forEach(function(item, index){
            //   if(item.EmployeeID % 2){
            //     e.sender.tbody.find('tr:eq(' + index + ') a').hide();
            //   }
               console.log(item.SSVDate);   

            });
               
            }


            function customBoolEditor(container, options) {

                var editor = $('<input type="text" />')
                    .appendTo(container);

            }

        };



    }
})();