
let blackjack ={
    'you':{'scorespan':'#yourbjresult','div':'#yourbox','score':0},
    'dealer':{'scorespan':'#dealerbjresult','div':'#dealerbox','score':0},
    'cards':['2', '3', '4', '5', '6', '7','8', '9', '10','K','J','Q','A'],
    'cardsmap':{'2':2, '3':3, '4':4, '5':5,'6':6,'7':7, '8':8, '9':9, '10':10, 'K':10, 'J':10, 'Q':10, 'A':[1,11]},
    'wins':0,'loses':0,'draws':0,
    'stand':false,'turnsover':false ,'hit':false
};

const YOU =blackjack['you']
const DEALER = blackjack['dealer']




document.querySelector("#hit").addEventListener("click",blackjackhit)
document.querySelector("#deal").addEventListener('click',blackjackdeal)
document.querySelector("#stand").addEventListener('click',dealerlogic)
function blackjackhit(){
    if(blackjack['stand']===false){
    let card= randomcard();
    console.log(card)
    showcard(YOU,card);
    updatescore(card,YOU);
    showscore(YOU)
    blackjack['hit']=true;
    }
    
}
function randomcard(){
    let randomindex= Math.floor(Math.random()*13);
    return blackjack['cards'][randomindex];
}


function showcard(activeplayer,card){
    if (activeplayer['score']<=21)
    {
    let cardimg= document.createElement('img');
    cardimg.src=`./css/blackjack_assets/images/${card}.png`;
    document.querySelector(activeplayer['div']).appendChild(cardimg);
    }

}

function blackjackdeal(){
    if(blackjack['turnsover']===true ){
        blackjack['stand']=false;
    let yourimages= document.querySelector("#yourbox").querySelectorAll('img');
    let dealerimages= document.querySelector("#dealerbox").querySelectorAll('img');

    for (let i=0;i<yourimages.length;i++)
    {
        yourimages[i].remove();
    }
    for (let i=0;i<dealerimages.length;i++)
    {
        dealerimages[i].remove();
    } 
    winner();
    YOU['score']=0;
    DEALER['score']=0;
    document.querySelector("#yourbjresult").textContent=0;
    document.querySelector("#yourbjresult").style.color="white";
    document.querySelector("#dealerbjresult").textContent=0;
    document.querySelector("#dealerbjresult").style.color="white";
    document.querySelector("#bjdeal").textContent= 'Lets Deal!';
    document.querySelector("#bjdeal").style.color='white';
    blackjack['turnsover']=false;
    blackjack['hit']=false;

}

}
function updatescore(card,activeplayer){
    if (card==='A')
    {
        if(activeplayer['score']+blackjack['cardsmap'][card][1] <=21)
    {
            activeplayer['score']+=blackjack['cardsmap'][card][1];
    }
        else
    {
            activeplayer['score']+=blackjack['cardsmap'][card][0];
    }

    }
    else
    {
            activeplayer['score']+=blackjack['cardsmap'][card];
    }

}
function showscore(activeplayer){
    if(activeplayer['score']> 21){
        document.querySelector(activeplayer["scorespan"]).textContent="BUST!"
        document.querySelector(activeplayer["scorespan"]).style.color="red"

    }
    else{

    document.querySelector(activeplayer["scorespan"]).textContent = activeplayer['score'];
    }
}
function sleep(ms){
    return new Promise((resolve => setTimeout(resolve, ms)));
}
async function dealerlogic(){
    if(blackjack['hit']===true){
   
    blackjack['stand']=true;
    while(DEALER['score']<16 && blackjack['stand']===true)
    { 
    let card= randomcard();
    showcard(DEALER,card);
    updatescore(card,DEALER);
    showscore(DEALER);
    await sleep(1000);

    }
    
    blackjack['turnsover']=true;
    showresult(winner());
    
}
}

function winner(){
    var winner;
    
    if(YOU['score']<=21)
    {
        if(YOU['score'] > DEALER['score'] || (DEALER['score']>21)){
            blackjack['wins']++;
            winner= YOU;
        }
        else if (YOU['score']< DEALER['score']){
            blackjack['loses']++;
            winner= DEALER;
        }
        else if (YOU['score']=== DEALER['score']){
            blackjack['draws']++;
        
        }
    }
    else if (YOU['score']>21 && DEALER['score']<=21)
    {
        blackjack['loses']++;
        winner = DEALER;
    }
    else if (YOU['score']>21 && DEALER['score']>21)
    {
        blackjack['draws']++;
        }
    console.log('winner is '+ winner)
    return winner;
}
function showresult(winner){
    if(blackjack['turnsover']===true)
    {
    if (winner===YOU){
        document.querySelector('#wins').textContent=blackjack['wins'];
        message='You Won'
        messagecolor='green'
    }

    else if (winner===DEALER){
        document.querySelector('#losses').textContent=blackjack['loses']
        message='You Lost'
        messagecolor='red'

    }
    else
    {
        document.querySelector('#draws').textContent=blackjack['draws']
        message='DRAW!'
        
    }
    document.querySelector("#bjdeal").textContent= message;
    document.querySelector("#bjdeal").style.color=messagecolor;
    }
}
