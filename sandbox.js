$(document).ready(function(){
    // code goes here
	var date = new Date();
	console.log(date.toString());
	console.log(date.toISOString());
	console.log(date.toUTCString());
});
/*
app.controller('testGrid', ['$scope', function($scope){
    var users = [
            {
                user_name: 'test 1',
                is_member: false,
                is_manager: false
            },
            {
                user_name: 'test 2',
                is_member: true,
                is_manager: false
            },
            {
                user_name: 'test 3',
                is_member: true,
                is_manager: true
            }
        ];
    
    $scope.checkMember = function(rowObj){
        if(rowObj.is_manager){
            rowObj.is_member = true;
        }
    };
    $scope.checkManager = function(rowObj){
        if(!rowObj.is_member){
            rowObj.is_manager = false;
        }
    };
    
    $scope.testGridOptions = {
        data: users,
        columnDefs: [
            {
                displayName: 'Name',
                endableHiding: false,
                field: 'user_name',
                cellTemplate: '<div><h1>{{COL_FIELD}}</h1></div>'
            },
            {
                displayName: 'Member',
                endableHiding: false,
                field: 'is_member',
                cellTemplate: '<label class="switch">'
                                    +'<input type="checkbox" ng-model="row.entity.is_member" ng-change="grid.appScope.checkManager(row.entity)">'
                                    +'<div class="slider round"></div>'
                                +'</label>'
            },
            {
                displayName: 'Manager',
                endableHiding: false,
                field: 'is_manager',
                cellTemplate: '<label class="switch">'
                                    +'<input type="checkbox"  ng-model="row.entity.is_manager" ng-change="grid.appScope.checkMember(row.entity)">'
                                    +'<div class="slider round"></div>'
                                +'</label>'
            }
        ]
    }
}]);

app.controller('testList', ['$scope', function($scope){
    $scope.options = [
        {display_name: 'test 1', isOwner: true, selectable: true},
        {display_name: 'test 2', isOwner: true, selectable: false},
        {display_name: 'test 3', isOwner: false, selectable: true},
        {display_name: 'test 4', isOwner: true, selectable: true},
        {display_name: 'test 5', isOwner: false, selectable: false},
        {display_name: 'test 6', isOwner: false, selectable: true},
        {display_name: 'test 7', isOwner: true, selectable: true}
    ];
    $scope.selected = [];
    setTimeout(function(){
        $("select").multiselect({
            multiple: true,
            noneSelectedText: 'Select an Option',
            selectedList: 4
        });
    },1);
}]);
*/
app.factory('SharedDefaults', function(){
	return{
		formats: {
			dateFormat: 'MM/DD/YYYY',
			dateTimeFormat: 'MM/DD/YYYY hh:mm:ss'
		},
		timeZones: {
			'UTC': 'UTC',
			'Europe/London': 'Europe/London',
			'GMT': 'GMT',
			'MST': 'MST',
			'Local': moment.tz.guess()
		}
	}
});

app.factory('SessionSettings', function(){
	return {
		timeZone: moment.tz.guess()
	}
})

app.directive('dateParser', ['SharedDefaults', 'SessionSettings', function(SharedDefaults, SessionSettings){
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl){
			modelCtrl.$parsers.push(function(input){
				
				var transformedInput = moment(input).tz(SessionSettings.timeZone);
				
//				if(transformedInput.format(SharedDefaults.formats.dateFormat) != input){
//					modelCtrl.$setViewValue(transformedInput);
//					modelCtrl.$render();
//				}
//			
//				return transformedInput;
			})
		}
	};
}])

app.controller('testDate', ['$scope', '$compile', 'SharedDefaults', 'SessionSettings', function($scope, $compile, SharedDefaults, SessionSettings){
	$scope.date = moment.tz(SessionSettings.timeZone);
	
	var target = document.getElementsByClassName('content')[0];
	var datepicker = $compile($('<input type="text" id="datepicker" ng-model="date" date-parser/>'))($scope);
	
	$(target).append(datepicker);
	$('#datepicker').datepicker();
	
	$scope.$watch('date', function(){
		console.log($scope.date)
	})
}]);

app.directive('timeZonePicker', ['SharedDefaults', 'SessionSettings', function(SharedDefaults, SessionSettings){
	return{
		restrict: 'AE',
		replace: true,
		require: 'ngModel',
		template: function(tElement, tAttrs) {
			var timezones = SharedDefaults.timeZones;//moment.tz.names(),
				dropdown = $(document.createElement('select'));
			dropdown.attr('id','TimeZonePicker');
			dropdown.attr('ng-change', 'onChange()');
			dropdown.attr('ng-model', 'option');
			
//			timezones.forEach(function(timezone){
//				dropdown.append('<option value="' + timezone + '">' + timezone + '</option>');
//			});
			
			for(var x in timezones){
				dropdown.append('<option value="' + timezones[x] + '">' + x + '</option>')
			}
	
			return dropdown.prop('outerHTML')
		},
		controller: function($scope){
			$scope.option = SharedDefaults.timeZones.Local;
			$scope.onChange = function(){
				SessionSettings.timeZone = $scope.option;
			}
			
			function init(){
				$('#TimeZonePicker').val(SharedDefaults.timeZones.Local);
			};
			init();
		}
	}
}])