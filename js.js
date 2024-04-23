let dominoDashes = [ //  ağın qoşasından altının qoşasına qədər domino daşlarına uyğun arraylar yaratmışam
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 3], [3, 4], [3, 5], [3, 6],
    [4, 4], [4, 5], [4, 6],
    [5, 5], [5, 6],
    [6, 6]
];


const botCardSelector = document.getElementById("botCard") // bot daşlarının düzüləcəyi hissə

const playerCardSelector = document.getElementById("playerCard") // player daşlarının düzüləcəyi

const boardSelector = document.getElementById("board")  // domino daşlarının düzüləcəyi hissə və
let boardContent = boardSelector.innerHTML // həmin hissənin daxilindəkilər


document.getElementById("bazar").addEventListener("click", () => { bazar("player") }) // bazar buttonuna klik olanda bazar funksiyasini cagirir

let playerCard = [] //Bu arraya playerin daşları yığılacaq
let botCard = [] // bura isə botun daşları
let board = [] // bura isə masaya oynanılan daşlar

let leftItemOnBoard // masadakı sol rəqəmi götürəcək
let rightItemOnBoard // bu isə sağ rəqəmi


function findDominoPiece() {  // bu funksiya domino masasında olmayan bir daşı random olaraq seçib qaytarır

    let rndNum = Math.floor(Math.random() * dominoDashes.length) // dominoDashes arrayının uzunluğuna nisbətən random rəqəm verir ki onu index kimi istifadə edək
    let selectedPiece = dominoDashes[rndNum]; // random rəqəm vasitəsilə dominoDashes-dan daş götürürük

    dominoDashes = dominoDashes.filter(item => !(item[0] == selectedPiece[0] && item[1] == selectedPiece[1]))  // və həmin götürdüyümüz daşı dominoDashes-dan çıxarırıq ki təkrar gəlməsin

    return selectedPiece
}


function setDominoesForPlayers() {  // bu funksiya bot ilə playerin daşlarını təyin edir. findDominoPiece funksiyasından hər biri üçün 7 daş alıb yığır cardlara 
    while (playerCard.length < 7) {
        let dominoPcsForPlayer = findDominoPiece()
        playerCard.push(dominoPcsForPlayer)
    }
    while (botCard.length < 7) {
        let dominoPcsForBot = findDominoPiece()
        botCard.push(dominoPcsForBot)
    }
}

setDominoesForPlayers()

setDominoesForPlayers = null // bu funksiya 1 dəfə lazım olur deyə çağırıb sonra dəyərini null edirik ki ramda yer tutmasın (ölüm də yer tuturdu axı :D )

class Printer {

    static printBotCards() { // bu funksiya botun cardındakı daşları döndürür və botun board divinə yerləşdirir

        let botContext = botCardSelector.textContent

        botCard.forEach(item => {
            botContext += `<div>
            <img src="./img/[${item[0]}, ${item[1]}].png" 
            alt="Bot Dominoes"></div>`
        })
        botCardSelector.innerHTML = botContext
    }


    static printPlayerCards() { // player üçün də həmçinin
        let playerContext = playerCardSelector.textContent
        playerCard.forEach(item => {

            playerContext += `<div>
                <img class="playerDominoCard"
                id="${item[0]}${item[1]}"
                forBoardId="[${item[0]}, ${item[1]}]" 
                src="./img/[${item[0]}, ${item[1]}].png" 
                alt="Player Dominoes"></div>`

        })
        playerCardSelector.innerHTML = playerContext
    }


    static printBoardItems(item, direction,itemOnBoard) { // bu funksiya oynanılmış daşları print edir. arqument olaraq yazılacaq daşı, masanın hansı hissəsinə yerləşdirəcəyini və yerləşdirəcəyi hissədəki rəqəmi alır


        if (board.length == 0) { // əgər masada daş yoxdursa yəni gələn ilk daşdırsa 

            if (item[0] == item[1]) { // və həmin daş qoşadırsa olduğu kimi  yəni vertical yerləşdiririk

                boardContent += `<img src="./img/[${item[0]}, ${item[1]}].png">`

            } else { // əgər qoşa deyilsə ilk daş olduğu üçün istiqamətinə baxmadan horizontal yerləşdiririk

                boardContent += `<img class="rotateLeft" src="./img/[${item[0]}, ${item[1]}].png" style="margin-left: calc(89vw/33);  margin-right: calc(89vw/33)">`

            }


        } else { // əgər gələn ilk daş deyilsə 

            if (direction == "left") { // və sol tərəfə yerləşdiriləcəksə

                if (item[0] == item[1]) { // və qoşadırsa 


                    boardContent = `<img src="./img/[${item[0]}, ${item[1]}].png">` + boardContent // bu formada vertical yerləşdiririk


                }else{ // əgər daş qoşa deyilsə

                    if(item[0]==itemOnBoard){ // və əgər daşın yuxarı tərəfi masadakı sıranın soluna uyğundursa sağa dönük şəkildə yerləşdiririk

                        boardContent = `<img src="./img/[${item[0]}, ${item[1]}].png" style="margin-left: calc(89vw/33);  margin-right: calc(89vw/33)" class="rotateRight">` + boardContent 

                    }else{ // yox əgər daşın alt tərəfi masadakı sıranın sol tərəfinə uyğundursa onda sola dönük şəkildə yerləşdiririk

                        boardContent = `<img src="./img/[${item[0]}, ${item[1]}].png" style="margin-left: calc(89vw/33);  margin-right: calc(89vw/33)" class="rotateLeft">` + boardContent
                    }

                }

            }else{ // əgər direction olaraq sağ seçilibsə yəni sağa yerləşdirəcəyiksə bu blok işləyir aşağı-yuxarı sola yerləşdirdiyimiz kimi bunu da nizamlayırıq


                if (item[0] == item[1]) { 


                    boardContent += `<img src="./img/[${item[0]}, ${item[1]}].png">` 


                }else{ 

                    if(item[0]==itemOnBoard){
                        boardContent += `<img src="./img/[${item[0]}, ${item[1]}].png" style="margin-left: calc(89vw/33);  margin-right: calc(89vw/33)" class="rotateLeft">` 
                    }else{
                        boardContent += `<img src="./img/[${item[0]}, ${item[1]}].png" style="margin-left: calc(89vw/33);  margin-right: calc(89vw/33)" class="rotateRight">` 
                    }

                }

            }

        }

        boardSelector.innerHTML = boardContent // burada isə masanın contentini masaya göndəririk
    }

}

// bu sunksiyaların hərəsini 1 dəfə oyun başlayanda çağırırıq ki oyunçuların masasında daşlar görünsün
Printer.printPlayerCards()
Printer.printBotCards()


document.addEventListener('click', e => {  //click eventi
    if (e.target.classList.contains('playerDominoCard')) { // click daşlara olubsa bu bloka girir

        const idForBoard = e.target.attributes.id.value.split("") // her klikde id götürürük

        const dominoPcsPlayer = [+idForBoard[0], +idForBoard[1]]  // idForBoard id string qayıdır deyə arraya çeviririk 


        if (board.length != 0) { //əgər masada daş varsa

            if (setLeftAndRight(dominoPcsPlayer)) {  // yoxlayır ki oynamaq istədiyi daş masaya uyğundur mu

                setPlayerCard(dominoPcsPlayer) // açıqlama altda
            } else {
                alert(`Duzgun daxil edin. sol:  ${leftItemOnBoard}, sağ:  ${rightItemOnBoard}`);
            }
        } else { // əgər masada daş yoxdusa

            Printer.printBoardItems(dominoPcsPlayer) // ilk daş olduğu üçün onu masaya yerləşdirmək lazımdır 

            board.push(dominoPcsPlayer) // board arrayına click olunan daşı əlavə edirik
            leftItemOnBoard = dominoPcsPlayer[0] // masadakı daşın sol reqemin gotururuk
            rightItemOnBoard = dominoPcsPlayer[1]  //  hemçinin sağ reqemi

            setPlayerCard(dominoPcsPlayer)  // açıqlama altda

        }

        checkWin() // qalibiyyət halını yoxlayırıq
    }
})



function setPlayerCard(idForBoard) { // bu funksiya playerin oynadığı daşı önce playerCard arrayından sonra masadan silir ve 1 saniyə sonra botu oynaması üçün çağırır

    playerCard = playerCard.filter(item => !(item[0] == idForBoard[0] && item[1] == idForBoard[1]))  //silir

    Printer.printPlayerCards() //yazır

    setTimeout(() => { botOption() }, 1000); // bot 1 saniyə sonra oynayır açıqlama altda
}



function botOption() {  // botun oynaması üçün funksiya.

    if (!controlCard(botCard)) { // detallı açıqlama aşağıda, qısaca olaraq o deməkdir əldə oynamağa daş yoxdur

        if (dominoDashes.length != 0) { // və əgər bazarda daş qalıbsa

            bazar("bot")  // get bazara
            return botOption()  // özünü çağır

        } else { // əlində oynamağa və bazarda da daş yoxdusa heç bir şey eləmə ki player təkrar oynasın

            return
        }
    } else { // əgər oynamağa daş varsa 

        let rndForOption = Math.floor(Math.random() * botCard.length)  // random rəqəm götür və aşağıda botCarddan o rəqəmə görə daş təyin elə
        let option = botCard[rndForOption]

        if (setLeftAndRight(option)) {  // oynamaq istəninilən daşı yoxlayırıq əgər oynamaq olarsa 

            botCard = botCard.filter(item => !(item[0] == option[0] && item[1] == option[1])) // həmin daşı botun cardından çıxarırıq

            Printer.printBotCards() // masadan daşın itməsi üçün cardları yenidən yazdırırıq   

        } else { // əgər oynamaq olmazsa funksiya yenidən çağırılır ta ki oynamaq mümkün olanadək (məntiq xətası var bilirəm amma data azdı deyə nəzərə çarpmır)
            return botOption()
        }


    }


    checkWin() // qalibiyyət halını yoxlayır

    if (!controlCard(playerCard) && dominoDashes.length == 0) { // bu botun hər dəfə oynadıqdan sonra playerin oynamasını gözləmədən playerin əlindəki daşları və bazarı yoxlayır əgər playerin əlində oynaya biləcəyi və bazarda daş yoxdusa botun özü yenidən oynayır 

        setTimeout(() => {
            botOption()
        }, 500);
    }
}


function setLeftAndRight(dominoPcs) {  // array formasında arqument(oynamaq istənilən daş) qəbul edir və gələn daşın içində sol və ya sağ rəqəmin varlığını yoxlayır əgər varsa sağ sol rəqəmləri dəyişir

    let result = true

    if (dominoPcs.includes(leftItemOnBoard)) { // əgər masadakı sol daş oynamaq istənilən daşda var mı


        if (dominoPcs[0] == leftItemOnBoard) { // əgər gələn daşın sol tərəfi masadakı daşın sol tərəfinə bərabərdirsə o zaman bu blok işləyir və

            
            Printer.printBoardItems(dominoPcs, "left", leftItemOnBoard) // printerə deyirik ki dominoPcs ilə sənə göndərdiyim daşı "left" istiqamətində leftItemOnBoard-a uyğun olaraq yerləşdir


            leftItemOnBoard = dominoPcs[1]  // gələn daşın sağ tərəfində ki rəqəmi masadakı daşların sol rəqəminə mənimsədirik
        } else {

            Printer.printBoardItems(dominoPcs, "left", leftItemOnBoard) // masaya daşı yerləşdiririk

            leftItemOnBoard = dominoPcs[0]  // əgər gələn daşın sağı masadakı sol daşa bərəbərdirsə onda gələn daşın sol tərəfini masadakı sol rəqəmə təyin edirik
        }

        board.unshift(dominoPcs)  // və həmin daşı boardın əvvəlinə əlavə edirik axı masada sol tərəfə oynadı

    } else { // əgər sol daş oynamaq istənilən daşda yoxdusa
        if (dominoPcs.includes(rightItemOnBoard)) { // sağ daşı yoxlayır və əgər varsa 
            if (dominoPcs[0] == rightItemOnBoard) {  // sol tərəfdə etdiklərimizə uyğun lakin bu səfər sağa uyğun olaraq işləyir

                Printer.printBoardItems(dominoPcs, "right", rightItemOnBoard) // masaya daşı yerləşdiririk

                rightItemOnBoard = dominoPcs[1]
            } else {


                Printer.printBoardItems(dominoPcs, "right",rightItemOnBoard) // masaya daşı yerləşdiririk

                rightItemOnBoard = dominoPcs[0]
            }
            board.push(dominoPcs) // bu səfər arrayın sonuna əlavə edirik oyunun sağda getdiyi üçün
        } else {  // əgər sağ və sol tərəf heç biri daşda yoxdusa resultu false edirik ki oyunçu başqa daş seçsin 

            result = false
        }
    }

    return result
}


function controlCard(card) { // bu funksiya card qəbul edir arqument olaraq.Card içində arraylar olan arraydır. Həmin carddakı arrayları yoxlayır. Əgər sol və ya sağ rəqəmə bərabər olan daş varsa true qaytarır əks halda false

    return card.some(item => item.includes(leftItemOnBoard) || item.includes(rightItemOnBoard))
}



function checkWin() { // cardları ayrı ayrı yoxlayır kim daşların hamısını bitirib O qalib olub deməkdir
    if (botCard.length == 0) {
        alert("Bot qalib geldi (okey vurma, yeniden baslat)");

    }

    if (playerCard.length == 0) {
        alert("Player qalib geldi (okey vurma, yeniden baslat)");
    }

    if (!controlCard(botCard) && !controlCard(playerCard) && dominoDashes.length == 0) { // test edilmedi beraberlik halini yoxlamalidi
        alert("beraber qaldiniz (okey vurma, yeniden baslat)");
    }

}

function bazar(gamer) { // kim üçün getdiyini arqument olaraq alır 

    if (dominoDashes.length != 0) { // əgər dominoDashes-da daş varsa

        const dominoPiece = findDominoPiece() // bir daş seçir 

        if (gamer == "player") {

            playerCard.push(dominoPiece) // playerin cardına əlavə edir
            Printer.printPlayerCards() // print edir

        } else if (gamer == "bot") { // bot üçün də həmçinin

            botCard.push(dominoPiece)
            Printer.printBotCards()
        }
    } else { // əgər bazarda daş yoxdursa

        alert("bazarda daş qurtardı"); // alert çıxarırıq 

        document.getElementById("bazar").disabled = true; // sonra buttonu click eventin disabled edirik
    }
}