var app = angular.module("myApp",[]);
	app.controller("dmCtl2",["$scope",function($scope){
		var datas = [
			{
				firstname:"FANG",
				lastname:"vane",
				salary:1233.50,
				birthday:"2007-07-11"
			},
			{
				firstname:"SARA",
				lastname:"rose",
				salary:232334.23,
				birthday:"1997-02-03"
			},
			{
				firstname:"AAM",
				lastname:"hot",
				salary:66880.50,
				birthday:"1986-03-04"
			},
			{
				firstname:"MARK",
				lastname:"bear",
				salary:6800.00,
				birthday:"1968-03-22"
			}
		];
		$scope.findVal = "";
		$scope.datas = datas;
		$scope.search = function(obj){
			if($scope.findVal != ""){
				if(obj.firstname.toLowerCase().indexOf($scope.findVal.toLowerCase()) != -1 || obj.lastname.toLowerCase().indexOf($scope.findVal.toLowerCase())!= -1){
					return true;
				}else{
					return false;
				}
			}else{
				return true;
			}
		}
		$scope.order = null;
		$scope.toggleSort = function($event,sortval){
			console.log($event);
			var el  = $event.path[0].firstElementChild;
			if(el.className== "" || el.className=="tri-up")
			{
				el.className="tri-down";
				$scope.order = sortval;

			}else if(el.className == "tri-down"){
				el.className= "tri-up";
				$scope.order = -sortval;
			}
			$(el).parent().siblings().find("span").removeClass();
        };
	}])