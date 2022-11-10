(() => {

    const actions = {
        birdFlies(key){
            if(key){
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
            } else {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`;
            }
        },
        birdFlies2(key){
            if(key){
            document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, translate(${-window.innerHeight * 0.7}px)`;
            } else {
            document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
            }
            // ` ' 이거 겁나헷갈린다..
        }
    };

    const stepElems = document.querySelectorAll('.step');
    const graphicElems = document.querySelectorAll('.graphic-item');
    let currentitem = graphicElems[0]; //0번 인덱스를 담아두고 새로고침 했을 때 바로 보일 수 있게하기
    //현재 활성화된 visible 클래스가 붙은  .graphic-item을 저장하는 변수
    let ioIndex;
    // intersection observer 어떤 요소가 보이는지 안보이는지 체크   
    const io = new IntersectionObserver((entries, observer)=>{
        //동작테스트
        ioIndex = entries[0].target.dataset.index*1;
        console.log(ioIndex);
    });

    for (let i = 0; i < stepElems.length; i++) {
        //intersection observer 관찰대상 등록
        io.observe(stepElems[i]);
        stepElems[i].dataset.index = i;
        graphicElems[i].dataset.index = i;
    }

    function activate(action){
        currentitem.classList.add('visible');
        if(action){
            actions[action](true);
        }
    }

    function inactivate(action){
        currentitem.classList.remove('visible');//숨기기
        if(action){
            actions[action](false);    
            
        }
    }


    window.addEventListener('scroll', () => {
        let step;
        let boundingRect;
       

        //for (let i = 0; i<stepElems.length; i++) {
        for (let i = ioIndex-1; i<ioIndex+2; i++) {
            step = stepElems[i];
            if(!step) continue;
            boundingRect = step.getBoundingClientRect();
            
           

            if(boundingRect.top > window.innerHeight * 0.1 &&
                boundingRect.top < window.innerHeight * 0.8){
                        inactivate(currentitem.dataset.action);
                    // 보이게하기
                    currentitem = graphicElems[step.dataset.index];
                        activate(currentitem.dataset.action);
               }
        }
    });

    activate();

    
})();

//이벤트 핸들러의 기능은 구구절절하게 들어있으면 보기 않좋다.
//함수 생성 후 기능을 부여하고 이벤트 핸들러에서는 함수만 불러오게 하자.

// 즉시실행 익명함수 안에서 뱐수를 만들면 블럭안에 지역변수가 돠어 외부에서 접근하지 못함
//stepElems[i].setAttribute('data-index',i);
//stepElems[i].dataset.index = i;
//graphicElems[i].dataset.index = i;

//for (let i = 0; i < stepElems.length; i++) {
//    stepElems[i].setAttribute('dataset', i);
//    graphicElems[i].setAttribute('dataset', i);
//}
// for (let i = 0; i < graphicElems.length; i++) {
//    graphicElems[i].setAttribute('dataset', i);
//}

//이미지파일 갯수와 글상자의 갯수가 동일해야한다.
