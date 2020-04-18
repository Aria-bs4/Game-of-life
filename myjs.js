window.onload = function() {
    var lifeBox = document.getElementById("lifeBox");
    var height = 20;
    var weight = 20;
    var chanceOfLife = 2;
    var world = new Array();
    var newworld = new Array();

    buildWorld();
    setInterval(function(){ revolution() },800);
    
    // console.log(world.join('\n'));

    function buildWorld(){
        for(var x = 0 ; x < weight ; ++x){
            world[x] = new Array();
            newworld[x] = new Array();
            for(var y = 0 ; y < height ; ++y){
                newworld[x][y] = 0;
                world[x][y] = Math.random()*10 > chanceOfLife ? 0 : 1 ;
                var box = document.createElement('div');
                box.id = x.toString() + y.toString() ;
                box.classList.add("box");
                //box.innerHTML = world[x][y];
                if(world[x][y])
                    box.style.backgroundColor = "#121615";
                else
                    box.style.backgroundColor = "#f9f9f9";
                lifeBox.appendChild(box);
            }
        }
    }

    function revolution(){
        for(var x = 0 ; x < weight ; ++x){
            for(var y = 0 ; y < height ; ++y){
                var lives = 0;
                for(var xd = x-1 ; xd <= x+1 ; ++xd){
                    for(var yd = y-1 ; yd <= y+1 ; ++yd){
                        if(world[(xd+weight)%weight][(yd+height)%height])
                            ++lives;
                    }
                }
                if(world[x][y])
                    --lives;
                newworld[x][y] = (lives == 3 || (lives==2 && world[x][y]==1)) ? 1 : 0 ;
            }
        }
        

        for(var x = 0 ; x < weight ; ++x){
            for(var y = 0 ; y < height ; ++y){
                world[x][y] = newworld[x][y];
            }
        }
       
        rebuildworld();
    }

    function rebuildworld(){
        var box = document.getElementsByClassName("box");
        for(var x = 0 ; x < weight ; ++x){
            for(var y = 0 ; y < height ; ++y){
                var num = (x*weight) + y;
                if(world[x][y])
                    box[num].style.backgroundColor = "#121615";
                else
                    box[num].style.backgroundColor = "#f9f9f9";
            }
        }
    }
    


};