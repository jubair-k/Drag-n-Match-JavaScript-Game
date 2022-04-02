document.addEventListener('DOMContentLoaded',() => {
    let images=document.querySelectorAll('img');
    const wraper=document.querySelector('.wrap');
    const container=document.querySelector('.container')
    let metchBoxs=document.querySelectorAll('.match_box')
    let checkArr=[]
    let val=0

    images.forEach(ele => {
        ele.addEventListener('mousedown',(e)=>{
            element=e.target;
            document.addEventListener('mousemove', drag);
        })

        ele.ondragstart = function () {
            return false
        }
    });

    document.addEventListener('mouseup', () => {
        if(val==1){
            checkArr.push(element.src);
            val=0;
            if(checkArr.length==2 && checkArr[0]!='' && checkArr[1]!=''){
                if(checkArr[0]===checkArr[1]){
                    metchBoxs.forEach(ele => ele.classList.add('correct_match') );

                    message=setTimeout(() => {
                        metchBoxs.forEach(ele => ele.classList.remove('correct_match') );
                    }, 500);

                    for(i=0;i<=images.length-1;i++){
                        if(images[i].src==checkArr[0]){
                            images[i].remove();
                        }
                    }
                    checkArr=[];
                }
                else{
                    metchBoxs.forEach(ele => ele.classList.add('wrong_match') );

                    message=setTimeout(() => {
                        metchBoxs.forEach(ele => ele.classList.add('wrong_match') );
                    }, 500);
                }
            }
        }
        else{
            let index = checkArr.indexOf(element.src);
            if (index > -1) {
            checkArr.splice(index, 1);
            }
        }
        document.removeEventListener('mousemove', drag);
        //console.log(checkArr);
    });

    function drag(){
        wrapBound=wraper.getBoundingClientRect()
        if (event.clientX < wraper.offsetWidth+wrapBound.x-(element.offsetWidth) &&
            event.clientX > wrapBound.x && event.clientY > wrapBound.y &&
            event.clientY < wraper.offsetHeight+wrapBound.y-(element.offsetWidth) ) {
            element.style.position = "absolute";
            element.hidden = true;
            element.style.top = event.clientY - element.offsetHeight / 2 + "px";
            element.style.left = event.clientX - element.offsetHeight / 2 + "px";
            ele = document.elementFromPoint(event.pageX, event.pageY);
            element.hidden = false;
            if (ele.className == "match_box") {
                pos = ele.getBoundingClientRect();
                element.style.top = pos.y + ele.offsetHeight / 2 - element.offsetHeight / 2 + "px";
                element.style.left = pos.x + ele.offsetWidth / 2 - element.offsetWidth / 2 + "px";
                val=1;
            }
            else{
                val=0
            }
        }
    }



})