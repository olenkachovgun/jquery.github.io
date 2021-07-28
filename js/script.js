$(function(){
    //header
    $("#logo").animate({marginLeft:"80px"},3000);
    $("#header_content").animate({marginTop:"0"},4000);

    $("#main_right").show(6000);
    $("#main_left").hide();
    $("#main_left").show(6000);
    //acordion podcast
   
    let myicons = {
        header:"ui-icon-caret-1-n",
        activeHeader:" ui-icon-caret-1-s"
    };

    $(".podcast").accordion({
        collapsible:true, //дозволяє закривати вкладки
		active:false, //при завантаженні сторінки всі вкладки закриті, можна вказати номер активної вкладки
		heightStyle:"content",

    });
    //button "Show More":
    $("#button_podcast").click(function(){
       $(".hidden").slideToggle(2000);
       
       if ($("#button_podcast").text() != "Show More"){
        $(this).text("Show More");
       }
        else
        $(this).text("Hide More");
    });

    //slider
    $(".slider").each(function(){
        let obj = $(this);
        $(obj.append("<div class='nav'></div>"));//перемикачі
        $(obj).find('li').each(function(){
            
            $(obj).find(".nav").append("<span rel='"+$(this).index()+"'></span>"); //додаємо додаткову навігацію, яка відповідає порядковому номеру і навігаційному елементу і елементу у слайді
            $(this).addClass("slider"+$(this).index());//додаємо клас для кожного окремого зображення це буде порядковий номер цього зображення	
        })
        
        $(obj).find('span').first().addClass('on'); //звертаємося до 1-го перемикача і робимо його активним
        
        //Створюємо функцію. obj-номер зображення, sl- сам слайдер:
        function sliderMoto(obj,sl){
            let ul = $(sl).find('ul');	
            let bl =$(sl).find("li.slider"+obj); //знаходимо зображення з потрібним номером 
            let step = $(bl).width();//ширина зображення для анімації
            $('ul').animate({marginLeft:"-"+step*obj},1000);
        }
        $(document).on("click", ".slider .nav span",function(){
            let sl=$(this).closest(".slider"); //зберігаємо найближчий батьківський елемент, тобто слайдер того перемикача на який був клік
            $(sl).find("span").removeClass("on"); //видаляємо клас з активного перемикача
            $(this).addClass("on");//додаємо клас на який відбувався клік 
            //перемикачі працюють!
            let obj = $(this).attr("rel");
            sliderMoto(obj,sl);
        })
    
    })



    $(".features-grid").draggable();
    let helmetsCount = 0,     //кількість мото
    summa = 0,      //сума
    $gallery = $(".features-grids"),    //галерея мото
    $trash = $(".koshik-wrapper");      //кошик
    $("#draggable1").draggable({helper:'clone'});   //дозволяє використовувати клон елементу для перетягування
    $("#draggable2").draggable({helper:'clone'});
    $("#draggable3").draggable({helper:'clone'});
    $("#draggable4").draggable({helper:'clone'});
    $("#draggable5").draggable({helper:'clone'});

    $trash.droppable({
        accept:".features-grids > div",     //дозволяємо тільки тим елементам які знаходяться в галереї
        classes:{
            "ui-droppable-active":"ui-state-highlight"       //додаємо клас, коли перетягнули елемент, для кошика 
        },
        drop: function( event, ui){ 
            deleteImage(ui.draggable);  //викликаємо функцію
            
            helmetsCount++;  //збільшуємо кількість мото
            if(helmetsCount > 0){
                $("#myclear").show()   //показуємо дів після кошика
            }
            $("#helmetsCount strong").text(helmetsCount); //виводимо кількість мото
            let helmet =$(ui.draggable).children();  //children() - метод, що дозволяє звертатися до нашадків дів
            summa+= parseInt(helmet.attr("price")); // витягуємо ціну з елементу і збільшуємо
            $("#helmetsSumm strong").text(summa) //виводимо суму
            //виводимо в модальне вікно обраний
            $("#dialog").dialog("open"); 
            $("#dialog").html(
                ui.draggable.text()
            );
        }
    });
    //налаштовуємо зворотні перетягування з кошика в галерею:
    $gallery.droppable({
        accept:".koshik-wrapper div",
        classes:{
            "ui-droppable-active":"custom-state-active"       //додаємо клас, коли перетягнули елемент, з кошика 
        },
        drop:function(event, ui){
            helmetsCount--;  //зменшуємо кількість мото 
            if(helmetsCount==0){
                $("#myclear").hide();
            }
            $("#helmetsCount strong").text(helmetsCount);
            let helmet2 =$(ui.draggable).children();  
            summa-= parseInt(helmet2.attr("price")); // витягуємо ціну з елементу і зменшуємо її
            $("#helmetsSumm strong").text(summa) //виводимо суму 
            deleteImage2(ui.draggable)
        }
    });

    

//функція відповідає за появу зображення в кошику, тобто вона видаляє елемент з галереї.
//Наш елемент спочатку зникає а потім з"являється
//$item - елемент, який перетягується
function deleteImage($item){
    $item.fadeOut(function(){
        let $list = $("ul",$trash).length ? //$list - відповідає за перелік елементів в кошику 
                $("ul",$trash) :
                $("<ul class='gallery ui-helper-reset'>").appendTo($trash);    
     
        //проявляємо(показуємо) елемент та зменшуємо його розміри  
        $item.appendTo($list).fadeIn(function(){
            $item.animate({width:"80px"}).find("img").animate({height:"55px",width:"70px",borderRadius:"50%"});
            $item.find("h3").animate({marginLeft:"10px"});
        });

    });
}

function deleteImage2($item){
    $item.fadeOut(function(){
        $item.css("width","auto").find("img").css({height:"78px",width:"100px"});
        $item.find("h3").animate({fontSize:"18px"});
        $item.appendTo($gallery).fadeIn();
    })
}


//modal
$("#dialog").dialog({
    autoOpen:false,
    show:{
        effect:"blind",
        duration:1000
    },
    hide:{
        effect:"explode",
        duration:1000
    }
});






})