$(document).ready(function () {
    var h = $('#settings').offset().top;
    $('#forsetting').css("top", eval(h - 7));
    var isvisible = false;
    var isfinish = true;

    var isvisibleabout = false;
    var isfinishabout = true;

    var store ;
    var triger;
    var answer = new Object();
    
    $('#settings').on( "click", function() {
        if($(".areapaper").hasClass("onboard") &&  ($(".onboard").attr('id') != 'settingChange' )){
            console.log("call if in seting");
            console.log("this is whocalld"+$(".onboard").attr("whocalld"));
            repo(true,$(".onboard").attr("whocalld"),"settings");
            $("#"+$(".onboard").attr("whocalld")).trigger( "click" );
        }else{
            console.log("call else in setting");
            clickonset();
        }
        
        
        

    });

    $('#About').on( "click", function() {
        if($(".areapaper").hasClass("onboard") && ($(".onboard").attr('id') != 'aboutArea' )){
            console.log("call if in about");
            repo(true,$(".onboard").attr("whocalld"),"About");
            $("#"+$(".onboard").attr("whocalld")).trigger( "click" );
        }else{
            console.log("call else in about");
            clickonabout();
        }
        
    });

    function clickonset(){
        close_setting();
        open_seting();
       
    };

    function clickonabout(){
        if($('#aboutArea').is(":visible") && isvisibleabout && isfinishabout){
            //close about paper
            isfinishabout = false;
            $("#About span").hide(400);
            $(".onboard").animate({top: "420px"},400,function(){
                $(".onboard").removeClass("onboard").hide();
                console.log('Animation ended');
                answer["0"] = answer["1"] = 0;
                console.log(answer);
                answer = repo(false);
                console.log(answer);
                if((answer["0"] == "About")){
                    console.log("in the repo of about");
                    $("#"+answer[1]).trigger( "click" );
                }
                isfinishabout = true;
                isvisibleabout = false;
            });
        }
        if(!isvisibleabout && !$('#aboutArea').is(":visible")){
            //open about paper
            isvisibleabout = true; 
            $("#About span").addClass("clicked").show(400);
            // close_all_paper();
            $("#aboutArea").show().addClass("onboard").animate({top: "0px"},400);
        }
    }

    function close_setting(){
        if ($('#selectArea').is(":visible") && isvisible && isfinish) {
            //close the setting
            isfinish=false;
            $('#selectArea').stop(true, false);
            $('.settingItem').stop(true, false);
            $('#settingArea').stop(true, false);
            var items = $('.settingItem').length;
            //close the paper of setting
            $(".onboard").animate({top: "420px"},300,function(){
                $(".onboard").removeClass("onboard").hide()
            });
            //
            $("#settings span").hide(1000);
            $('.settingItem').each(function () {
                $(this).animate({ opacity: "0", top: "150px" }, 500 + (items-- * 100), function () {
                    if (items == 0) {

                        $('#selectArea').animate({ width: "0" }, 500, function () {
                            $('#selectArea').hide();
                        });
                        $('#settingArea').animate({ width: "82%" }, 500, function () {
                            isfinish = true;
                            isvisible = false;
                            $("#settings span").removeClass("clicked");
                            $(".flash").animate({top:  "0px"},500);
                            console.log('Animation ended');
                            answer["0"] = answer["1"] = 0;
                            console.log(answer);
                            answer = repo(false);
                            console.log(answer);
                            if((answer["0"] == "settings")){
                                console.log("in the repo of setting");
                                $("#"+answer[1]).trigger( "click" );
                            }
                        });
                    }
                });
            });
        }
    };

    function open_seting(){
        if(!isvisible && !($('#selectArea').is(":visible"))) {
            //open the setting
            isvisible =true;
            $('#selectArea').stop(true, false);
            $('.settingItem').stop(true, false);
            $('#settingArea').stop(true, false);
            $("#settings span").addClass("clicked").show(1000);
            $("#settingChange").addClass("onboard")

            $('#settingArea').animate({ width: "75%" }, 400);
            $('#selectArea').animate({ width: "7%" }, 400, function () {
                //should put all papers down here   ******************************done
                //sit = close_all_paper();
                $("#settingChange").show().animate({top: "0px"},400);
                //show the items in middle area
                var items = $('.settingItem').length;
                $('.settingItem').each(function () {
                    $(this).animate({ opacity: "1", top: "0px" }, 300 + (items++ * 100));
                });
            });
            $('#selectArea').show();   
        }
    };

    function repo(state ,request = "-1" , checkme = "-1"){
        if(!state){
            var ans = new Object();
            ans = {"0": store , "1": triger};
            store = triger = 0;
            console.log("asn = " + ans);
            console.log(ans);
            return ans;
        }else {
            store = request;
            triger = checkme;
            // console.log(store +" " + triger);
            return {"0" : 0 , "1" : 0};
        }
    }

   
    $(".newcolor").hover(
        function(){ $(this).css("background-color", "var(--color2-hover)") },
        function(){ $(this).css("background-color", "var(--color2)") }
    );

    $(".settingItem").click(function(){
        console.log($(this).attr("num"));
        var num = $(this).attr("num");
        $("#settingChange").animate({top:  (num* -420).toString()},600);
        $(".flash").animate({top:  (num* 42) + "px"},600);
        });


    //************************************** */
    //************************************** */
    //    world setting

    $('.inputs').keydown(function(event){
        console.log(event.keyCode);    // it works
       // console.log($(this).val());    // it works
       //if( isFinite( $(this).val() )){
       var keycode = parseInt(event.keyCode);
       if( (keycode <= 105) && (keycode >= 96)  ){
           //here chould put number in what i want
           $(this).next().html("");

           if( !($(this).val()) && (keycode == 96) ){
               console.log("zero");
               $(this).next().html("cant be 0");
               //span should be you cant put zero size
               return false;
           }
           
       }else if(keycode == 8){
        
       }else{
           // clinet input character
           $(this).next().html("just number");
           console.log("character");
           return false;
       }

    
       // // $(this).
    });

    

   
});
