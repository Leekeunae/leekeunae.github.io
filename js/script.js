$(function(){

    let aboutTop;
    let skillTop;
    let portfolioTop;
    let contactTop;

    // 섹션의 반응 좌표 함수
    (function(){
        let secminu = 240;
        aboutTop = $('.about').offset().top - secminu;
        skillTop = $('.skill').offset().top - secminu;
        portfolioTop = $('.portfolio').offset().top - secminu;
        contactTop = $('.contact').offset().top - secminu;
    })(); 
    // JSON을 이용하여 모달창을 설정 함수 
    // jsonData는 json폴더에서 지정된 파일, 
    // idx JSON의 노드 인덱스 
    function fnModal(jsonData,idx){
        $('.modal-wrap .art').addClass(jsonData[idx].class);
        $('.modal-wrap img').attr('src',jsonData[idx].src);
        $('.modal-wrap img').attr('alt',jsonData[idx].alt);
        $('.modal-wrap video').attr('src',jsonData[idx].video);
        $('body').css({overflow:'hidden'});
        if($('.modal-wrap video').attr('src') == '#'){
            $('.modal-wrap video').hide();
        }else{
            $('.modal-wrap video').show();
        }
        $('.modal-wrap').fadeIn(300);
    }
    // 스크롤 거리에 따른 섹션의 클래스 설정 함수
    // active => animation effect
    function fnAcSec(topNum,acEl,scrollTop){
        if(scrollTop>=topNum){
            acEl.addClass('active');
        }else{
            acEl.removeClass('active');
        }
    }
    // txtEl => 타이핑 될 엘리먼트
    // speed => 타이핑 속도 num
    // elTxt => 타이핑 될 텍스트
    // 한글자씩 타이핑 되는 함수
    function fnTyping(txtEl,speed,elTxt){
        let txtElHeight = txtEl.height();
        let idx = 0;
        let lastIdx = elTxt.length-1;
        txtEl.css({
            height:`${txtElHeight}px`,
            display:'block'
        });
        txtEl.text('');
        
        let typing = setInterval(function(){
            let insertTxt = txtEl.text() + elTxt[idx++];
            txtEl.text(insertTxt);
            if(idx>lastIdx){
                clearInterval(typing);
            }
        },speed);
    };


    // 로고 애니메이션
    $('.logo').addClass('active');

    $(window).scroll(function(){
        let scrTop = $(this).scrollTop();
        fnAcSec(300,$('.header'),scrTop);
        fnAcSec(aboutTop,$('.about'),scrTop);
        fnAcSec(skillTop,$('.skill'),scrTop);
        fnAcSec(portfolioTop,$('.portfolio'),scrTop);
        fnAcSec(contactTop,$('.contact'),scrTop);
    })

    $('.btn-modal-open').click(function(e){
        let acIdx = $(this).attr('data-idx');

        $.ajax({
            url:'./json/modal.json',
            dataType:'json',
            success:function(loadData){
                fnModal(loadData,acIdx);
            },
            error:function(){
                alert('지금은 서비스 점검시간입니다.');
            }
        });
        

        e.preventDefault();
    })

    $('.modal-close').click(function(){
        $('body').css({overflow:'auto'});            
        $('.modal-wrap').fadeOut(300);
    })

    $('.pub-img').click(function(){
        let thisHref = $(this).attr('data-href');
        window.open(thisHref);
    })

    AOS.init();

    $('#btn-kakao').click(function(){
        $('.kakao').toggle(300);
    })    

    setTimeout(function(){
        fnTyping($('.intro h3'),500,'portfolio');
    },3500);

    fnTyping($('.footer strong'),100,'이 사이트는 개인 포트폴리오 용도로 제작되었습니다.');
    
    setInterval(function(){
        fnTyping($('.footer strong'),100,'이 사이트는 개인 포트폴리오 용도로 제작되었습니다.');
    },5000);
        
})