window.onload = function() {
    //decalare variables

    //variable to build world
    var lifeBox = document.getElementById("lifeBox");
    var vertical = 20;
    var horizental = 20;
    var chanceOfLife = 2;
    var timer;
    var world = new Array();
    var newworld = new Array();

    //variable for settings world
    var h = $('#settings').offset().top;
    $('#forsetting').css("top", eval(h - 7));
    var isvisible = false;
    var isfinish = true;

    var isvisibleabout = false;
    var isfinishabout = true;

    var store ;
    var triger;
    var answer = new Object();

    // var max_width = window.innerWidth - 20;
    var max_width = parseInt( $(".panel").width());
    var min_width = 350;
    var txt = "";
    var min_verti = Math.floor(min_width / (parseInt($("#mediom_life").val()) + 4));
    var max_verti = Math.floor(max_width / (parseInt($("#mediom_life").val()) + 4));
    txt += "min = " + min_verti;
    txt += "&emsp;max = " + max_verti;
    $("#worldvertical_span").html(txt);

    var min_horzi = 15;
    var max_horzi = 50;




    //*****************************************/
    //***************start game****************/
    //*****************************************/


    buildWorld();
    
    
    // console.log(world.join('\n'));

    function buildWorld(){
        for(var x = 0 ; x < horizental ; ++x){
            world[x] = new Array();
            newworld[x] = new Array();
            for(var y = 0 ; y < vertical ; ++y){
                newworld[x][y] = 0;
                world[x][y] = Math.random()*10 > chanceOfLife ? 0 : 1 ;
                var box = document.createElement('div');
                box.id = x.toString() +"."+ y.toString() ;
                box.classList.add("box");
                // box.innerHTML = (x*vertical) + y;
                if(world[x][y])
                    box.style.backgroundColor = "var(--color2)";
                else
                    box.style.backgroundColor = "var(--color4)";
                lifeBox.appendChild(box);
            }
        }
        timer = setInterval(function(){ revolution() },1000);
    }

    function revolution(){
        for(var x = 0 ; x < horizental ; ++x){
            for(var y = 0 ; y < vertical ; ++y){
                var lives = 0;
                for(var xd = x-1 ; xd <= x+1 ; ++xd){
                    for(var yd = y-1 ; yd <= y+1 ; ++yd){
                        if(world[(xd+horizental)%horizental][(yd+vertical)%vertical])
                            ++lives;
                    }
                }
                if(world[x][y])
                    --lives;
                newworld[x][y] = (lives == 3 || (lives==2 && world[x][y]==1)) ? 1 : 0 ;
            }
        }
        

        for(var x = 0 ; x < horizental ; ++x){
            for(var y = 0 ; y < vertical ; ++y){
                world[x][y] = newworld[x][y];
            }
        }
       
        rebuildworld();
    }

    function rebuildworld(){
        var box = document.getElementsByClassName("box");
        for(var x = 0 ; x < horizental ; ++x){
            for(var y = 0 ; y < vertical ; ++y){
                var num = (x*vertical) + y;
                if(world[x][y])
                    box[num].style.backgroundColor = "var(--color2)";
                else
                    box[num].style.backgroundColor = "var(--color4)";
            }
        }
    }

    function destroyworld(){
        clearInterval(timer);
        $("#lifeBox").children().remove();
    }

    //******************************************/
    //***************end of game****************/
    //******************************************/



    //******************************************/
    //***************start setting**************/
    //******************************************/
   
    //***********animate options********/
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
        // console.log($(this).attr("num"));
        var num = $(this).attr("num");
        $("#settingChange").animate({top:  (num* -420).toString()},600);
        $(".flash").animate({top:  (num* 42) + "px"},600);
    });

    //*******************************************/
    //*********** world setting *****************/
    //********check inputs are num or not*******/
    //******************************************/
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

    //****animation ans span for inputs */
    $(".labels_size").on("click", function () {
        $(".labels_size").removeClass("checked");
        $(this).addClass("checked");
    });

    $("input[type='radio']").change(function () {
        var width_x = parseInt($("input[type='radio']:checked").val()) + 4;
        console.log(parseInt($("input[type='radio']:checked").val()));
        txt = "";
        min_verti = Math.floor(min_width / width_x);
        max_verti = Math.floor(max_width / width_x);

        // blur the inputs to check value
        $("#worldvertical").blur();

        switch ($("input[type='radio']:checked").val()) {
            case "8":
                min_verti
                txt += "min = " + min_verti;
                txt += "&emsp;max = " + max_verti;
                // $("#worldvertical").val(min_verti);
                $("#worldvertical_span").html(txt);
                break;
            case "15":
                txt += "min = " + min_verti;
                txt += "&emsp;max = " + max_verti;
                // $("#worldvertical").val(min_verti);
                $("#worldvertical_span").html(txt);
                break;
            case "22":
                txt += "min = " + min_verti;
                txt += "&emsp;max = " + max_verti;
                $("#worldvertical_span").html(txt);
                break;
        }
    });

    $("#worldvertical").blur(function () {
        console.log("blur vertical");
        if (!$(this).val()) {
            // console.log("it cant be free");
            $(this).next().html("");
            $(this).val(min_verti);
        } else {
            if ($(this).val() < min_verti || $(this).val() > max_verti) {
                // $(this).val(min_verti);
                $(this).next().html("choose a number in range");
            } else {
                $(this).next().html("");
            }
        }
    });

    $("#worldhorizontal").blur(function () {
        if (!$(this).val()) {
            // console.log("it cant be free");
            $(this).next().html("");
            $(this).val(min_horzi);
        } else {
            if ($(this).val() < min_horzi || $(this).val() > max_horzi) {
                // $(this).val(min_verti);
                $(this).next().html("choose a number in range");
            } else {
                $(this).next().html("");
            }
        }
    });

    //**********submmit setting world ********************
    $('#save_world').on("click", function () {
        var size_input = $("input[type='radio']:checked").val();

        var verical_input = $('#worldvertical').val();

        var horizontal_input = $('#worldhorizontal').val();

        if (verical_input < min_verti || verical_input > max_verti || horizontal_input < 15 || horizontal_input > 50) {
            //false inputs
        } else {
            destroyworld();
            vertical = parseInt(verical_input);
            horizental = parseInt(horizontal_input);
            //build a link with 
            $("style#stylebox").html(".flex-container .box{width:" + size_input + "px!important;height:" + size_input + "px!important;}");
            $("#lifeBox").css("width", (parseInt(size_input) + 4) * verical_input + "px");
            //*****destroy world and build a new one */
            buildWorld();
        }

    });
    //*********click on cancel */
    $("#cancel_world").click(function(){
        close_setting();
    });

    //*******************************************/
    //**************end  setting*****************/
    //*******************************************/


};