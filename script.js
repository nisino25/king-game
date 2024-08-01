
// import { randomNames } from './name.js';
const app = Vue.createApp({
    data() {
        return {
            developingMode: true,
            defaultNumber: 5,

            currentPage: 'before',
            gameStatus: null,

            players: [],
            currentPlayerIndex: 0,
            chosenPlayer: null,
            
            teamColors: ['#DC143C', '#0047AB', '#228B22', '#FFD700', '#1C1C1C'],
            cardsPerPlayer : 5,


            randomNames:[
                'あきなす',
                'アケオメ',
                'あすなろ',
                'あと１ぽん',
                'あなご',
                'アニ',
                'あろあろ',
                'あんぱん',
                'イカフライ',
                'いただき',
                'いやいや',
                'うぃー',
                'ウエルカム',
                'ウキャキャ',
                'うすくち',
                'うっとり',
                'えっへん',
                'えぴ',
                'おおあたり',
                'おおとろ',
                'おかん',
                'おさきです',
                'おならプー',
                'かいがん',
                'カクテキ',
                'カターカタ',
                'かちょう',
                'ガニ',
                'かまくら',
                'からすみ',
                'からてか',
                'かるしうむ',
                'キャメロン',
                'グェ',
                'くっちゃね',
                'ぐらま～',
                'ぐらんぱ',
                'くるとん',
                'くろおび',
                'ゲジゲジ',
                'ごっつあん',
                'ことこと',
                'ごはん',
                'サラミ',
                'さんかく',
                'サンチュ',
                'シェフ',
                'しおしお',
                'しこみ',
                'しめさば',
                'じゃんぼ',
                'しらたき',
                'すなぎも',
                'スベスベ',
                'センス',
                'そばゆ',
                'そら',
                'っょぃゃっ',
                'つんつん',
                'ツンドラ',
                'ていおう',
                'デスポッド',
                'ですます',
                'てっかまき',
                'てばさき',
                'てふてふ',
                'テミヤゲ',
                'でろでろ',
                'とんかつ',
                'とんこつ',
                'トンズラ',
                'ナイスガイ',
                'なにがし',
                'ナポリタン',
                'ニイハオ',
                'にとうへい',
                'にんにくん',
                'ねるねる',
                'ハード',
                'はかばか',
                'ハロー',
                'はんぺん',
                'ヒエン',
                'ピカピカ',
                'ビギナー',
                'ヒットミー',
                'ぶぅぅぅん',
                'ふぉぉぉぉ',
                'へっぽこ',
                'ポ',
                'ぽりごん',
                'ポリスマン',
                'ぼるしち',
                'ぼんじり',
                'まえうしろ',
                'マエストロ',
                'ましかく',
                'まじかる',
                'マゼラン',
                'マタドール',
                'マヨラー',
                'まんまる',
                'まんもす',
                'メロリン',
                'モケモケ',
                'もずくす',
                'もみあげ',
                'もろへいや',
                'ヤヤ',
                'ゆたんぽ',
                'ゆでたまご',
                'よろしく',
                'ラスいち',
                'ラッキー',
                'りもこん',
            ],

            kings:[
                {name:'クマ', imgSrc:'./assets/image/bear.jpg', foodRequirements: [0,1]},
                {name:'オオワシ', imgSrc:'./assets/image/eagle.jpg', foodRequirements: [1,2]},
                {name:'シャチ', imgSrc:'./assets/image/orca.jpg', foodRequirements: [1,3]},
                {name:'キタキツネ', imgSrc:'./assets/image/fox.jpg', foodRequirements: [0,4]},
                {name:'タンチョウヅル', imgSrc:'./assets/image/crane.jpg', foodRequirements: [1,4]},
            ],

            food:[
                {name:'果物',imgSrc: './assets/image/food-1-v2.jpg'},
                {name:'魚',imgSrc: './assets/image/food-2-v2.jpg'},
                {name:'ねずみ',imgSrc: './assets/image/food-3-v2.jpg'},
                {name:'いか',imgSrc: './assets/image/food-4-v2.jpg'},
                {name:'虫',imgSrc: './assets/image/food-5-v2.jpg'},
            ],

            energy:[
                {name:'エネルギー',imgSrc: './assets/image/energy-1.jpg'},
                {name:'エネルギー',imgSrc: './assets/image/energy-2.jpg'},
            ],

            obstacle:[
                {name:'障害',imgSrc: './assets/image/obstacle-1-v2.jpg'},
                {name:'障害',imgSrc: './assets/image/obstacle-2-v2.jpg'},
                {name:'障害',imgSrc: './assets/image/obstacle-3-v2.jpg'},
                {name:'障害',imgSrc: './assets/image/obstacle-4-v2.jpg'},
            ],

            able:[
                {name:'できること',imgSrc: './assets/image/able-1.jpg'},
                {name:'できること',imgSrc: './assets/image/able-2.jpg'},
            ],

            deck:[],

            maxDarkness: 0.5,

            animationSpeed: 600,

            aiSpeed: 500,

            // ---------------------
            userName: null,

            // ---------------------
            isDieCast: false,
            previousRotationX : 0,
            previousRotationY : 0,

            finalCombinedRotationX: 0,
            finalCombinedRotationY: 0,

            
            rotations: {
                1: 'rotateX(0deg) rotateY(0deg)',
                2: 'rotateX(0deg) rotateY(-90deg)',
                3: 'rotateX(0deg) rotateY(90deg)',
                4: 'rotateX(-90deg) rotateY(0deg)',
                5: 'rotateX(90deg) rotateY(0deg)',
                6: 'rotateX(180deg) rotateY(0deg)'
            },

        };
    },
    computed: {
        readyToPlay() {
            const namePattern = /^[^\s!@#$%^&*(),.?":{}|<>]+$/;
            const uniquerandomNames = new Set(this.players.map(player => player.name.trim()));
            
            return this.players.length == 1 &&
                uniquerandomNames.size === this.players.length &&
                this.players.every(player => 
                    player.name.trim() !== '' && 
                    namePattern.test(player.name)
                );
        },

        yourPlayer() {
            return this.players.find(player => player?.name == this.userName);
        },

        yourPlayerHands() {
            return this.deck
            .filter(card => card.location === this.yourPlayer.name)
            .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        },

        otherPlayers() {
            const currentIndex = this.players.findIndex(player => player.name === this.userName);
            if (currentIndex === -1) return this.players; // Return the full list if currentPlayerName is not found
      
            const before = this.players.slice(0, currentIndex);
            const after = this.players.slice(currentIndex + 1);
      
            return after.concat(before);
        },

        currentPlayer() {
            return this.players[this.currentPlayerIndex];
        },

        drawPile() {
            return this.deck.filter(card => card.location === 'drawPile');
        },


        trashPile() {
            return this.deck
            .filter(card => card.location === 'trash')
            .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        },

        topTrashCard(){
            if(this.trashPile.length == 0) return false
            return this.trashPile[this.trashPile.length - 1]
        },


        playerHands() {
            return playerName => {
              return this.deck
                .filter(card => card.location === playerName)
                .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
            };
        },

        pickedCard() {
            return this.deck.find(card => card.picked) || null;
        },
        activeCard(){
            if(!this.pickedCard?.usingCard) return null

            return this.pickedCard
        },

        gettingDrawnCard(){
            return this.deck.find(card => card.gettingDrawn) || null;
        },

        movingCard(){
            return this.deck.find(card => card.location == 'moving') || null;
        },

        drawingCard(){
            return this.deck.find(card => card.location == 'drawing') || null;
        },

        rankingText() {
            // Calculate points for each player
            this.players.forEach(player => {
                player.points = player.babies.reduce((total, baby) => {
                    return total + (baby.foodArray.length === 2 ? 1 : 0);
                }, 0);
            });

            // Sort players by points in descending order
            const sortedPlayers = [...this.players].sort((a, b) => b.points - a.points);

            // Handle ties and create ranking text
            let text = '';
            for (let i = 0; i < sortedPlayers.length; i++) {
                if (i > 0 && sortedPlayers[i].points === sortedPlayers[i - 1].points) {
                    sortedPlayers[i].rank = sortedPlayers[i - 1].rank;
                } else {
                    sortedPlayers[i].rank = i + 1;
                }
                text += `${sortedPlayers[i].rank}位：${sortedPlayers[i].name} - ${sortedPlayers[i].points}ポイント\n`;
            }

            return text;
        },

        movingCardLocation() {
            let style = {
                transition: `all ${(this.animationSpeed / 1000) - 0.05}s`
            };

            if (!this.movingCard.hasDestination) {
                style = {
                    ...style,
                    left: this.movingCard.currentX + 'px',
                    top: this.movingCard.currentY + 'px',
                    width: this.movingCard.width + 'px',
                    height: this.movingCard.height + 'px',
                    transform: `rotate(${this.movingCard.rotation}deg)`,
                };
            } else {
                style = {
                    ...style,
                    left: this.movingCard.finalX + 'px',
                    top: this.movingCard.finalY + 'px',
                    width: this.movingCard.finalWidth + 'px',
                    transform: `rotate(${this.movingCard.finalRotation}deg)`,
                };
            }

            return style;
        },

        
        diceTransform() {
            return {
                transform: `translateX(-50%) translateY(-50%) rotateX(${this.finalCombinedRotationX}deg) rotateY(${this.finalCombinedRotationY}deg)`
            };
        }

        

    },
    watch: {
        // drawPile(newVal) {
        //     if(this.gameStatus !== 'distributed') return

        //     if (newVal.length === 0) {
        //         this.gameStatus = 'ended'
        //         alert('The draw pile is empty!');
        //     }
        // },
        players: {
            handler: async function(newVal) {
                if (this.currentPage !== 'game') {
                    return; // Skip processing if currentPage is not 'game'
                }
              newVal.forEach(async player => {
                const allBabiesFed = player.babies.every(baby => baby.foodArray.length === 2);
                if (allBabiesFed) {
                  await this.sleep(500);
                  alert(`${player.name}!が勝利しました！`);
                  this.gameStatus = 'ended';
                }
              });
            },
            deep: true
        },
    },
    methods: {
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        getDetail(){
            console.log(`---------------------`)
            console.log(this.deck)
            console.log(this.players)

            console.log(this.currentPlayer.name)
            console.log(this.currentPlayer)
            // console.log('drawingCard', this.drawingCard)

            console.log(this.rankingText)
            

            // console.log()
        },
        getRandomName() {
            let randomName;
            do {
                const randomIndex = Math.floor(Math.random() * this.randomNames.length);
                randomName = this.randomNames[randomIndex];
            } while (this.players.some(player => player.name === randomName));
            return randomName;
        },
        addPlayer() {
            const randomName = this.getRandomName();
            this.players.push({ name: randomName, isAI: true  });
            // this.players.push({ name: randomName});
        },
        removePlayer(index) {
            this.players.splice(index, 1);
        },

        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        },
        async goToGamePage() {
            if (!this.readyToPlay) return;

            this.userName = this.players[0].name

            for (let i = 0; i < 4; i++) {
                const randomName = this.getRandomName();
                this.players.push({ name: randomName, isAI: true });
            }

            
            
            
            // Shuffle and assign colors
            this.gameStatus = 'setting up game'
            this.shuffleArray(this.players);
            this.shuffleArray(this.teamColors);
            this.shuffleArray(this.kings);
            this.players.forEach((player, index) => {
                player.color = this.teamColors[index];
                player.king = this.kings[index];

                player.babies = []

                player.isRevealing = false

                // Generate baby image source
                const kingImgSrc = this.kings[index].imgSrc;
                const fileName = kingImgSrc.substring(kingImgSrc.lastIndexOf('/') + 1, kingImgSrc.lastIndexOf('.'));
                const fileExtension = kingImgSrc.substring(kingImgSrc.lastIndexOf('.'));
                const babyImgSrc = `./assets/image/${fileName}-baby${fileExtension}`;

                // Push the baby object 5 times
                for (let i = 0; i < 4; i++) {
                    player.babies.push({
                        kingImgSrc,
                        babyImgSrc,
                        isBlocked: false,
                        foodArray: [],
                    });
                }
            });

            // create the deck
            this.initializeDeck();



            // Reset the current player index
            this.currentPlayerIndex = 0;

            this.currentPage = 'game';

            this.shuffleArray(this.deck)

            
            await this.sleep(250)
            await this.distributeCards()

        },
        initializeDeck() {
            this.deck = [];

            const createNameIndexContainer = (counts) => {
                return counts.flatMap((count, index) => Array(count).fill(index));
            };

            const types = [
                {
                    type: 'food',
                    nameIndexContainer: createNameIndexContainer([8, 8, 7, 7, 8])
                },
                {
                    type: 'energy',
                    nameIndexContainer: createNameIndexContainer([5, 5])
                },
                {
                    type: 'obstacle',
                    nameIndexContainer: createNameIndexContainer([3, 3, 3, 3, ])
                },
                {
                    type: 'able',
                    nameIndexContainer: createNameIndexContainer([6, 6,])
                }
            ];

            const dataMap = {
                food: this.food,
                energy: this.energy,
                obstacle: this.obstacle,
                able: this.able
            };

            let id = 1;

            types.forEach(({ type, nameIndexContainer }) => {
                nameIndexContainer.forEach(nameIndex => {
                    const currentData = dataMap[type][nameIndex];

                    this.deck.push({
                        id: id++,
                        type: type,
                        name: currentData?.name,
                        imgSrc: currentData?.imgSrc, // Assuming imgSrc is part of your data
                        location: 'drawPile',
                        description: ''
                    });
                });
            });

            console.log(this.deck)
        },
        async distributeCards() {
            if (this.drawPile.length !== this.deck.length) return;

            for (let i = 0; i < this.cardsPerPlayer; i++) {
                for (let player of this.players) {
                    const card = this.drawPile[0];
                    if (card) {
                        // console.log(`Distributing ${card.id} to ${player.name}`);
                        card.location = player.name;
                        card.updatedAt = Date.now()
                        await this.sleep(25); // Add delay if needed
                    }
                }
            }

            this.gameStatus = 'distributed'
            if(this.currentPlayer.isAI) this.aiMove()
        },

        getCardStyle(card, index) {
            let style = {
                top: '50%',
                left: `${index * 20}%`,
                transform: `translateX(-${index * 20}%) translateY(-50%)`
            };
        
            if (card.picked) {
                style.transform += ' translateY(-25%)';
                style.zIndex = 100;
            }

            

            if(card.usingCard){
                style.left =  '5%'
                style.transform = `translateY(-50%)`
                style.zIndex = 20
                style.animation = 'unset';
            }
            
        
            return style;
        },
        validFoodCardCheck(card){
            if(this.currentPlayer !== this.yourPlayer) return
            if(!this.yourPlayer.hasDrawn) return
            if(card.type == 'food') {
                const kingFood1 = this.food[this.yourPlayer.king.foodRequirements[0]].name
                const kingFood2 = this.food[this.yourPlayer.king.foodRequirements[1]].name

                if(card.name == kingFood1 || card.name == kingFood2) return true

                return false
                
            }
        },

        async drawCard(){
            if(this.gameStatus !== 'distributed' || this.drawPile.length == 0) return
            
            // if(!this.playerHands(this.playerHands(this.currentPlayer.name[0])))return

            if(this.currentPlayer.hasDrawn) return

            this.drawPile[0].gettingDrawn = true
            this.drawPile[0].location = 'drawing'
            this.currentPlayer.hasDrawn = true
            this.currentPlayer.isRevealing = true

            // Set initial position
            const drawPileElement = document.querySelector('#drawPileBase .gameCard');

            const startPos = drawPileElement.getBoundingClientRect();
            this.drawingCardXCoordinate = startPos.left;
            this.drawingCardYCoordinate = startPos.top;

            this.drawingCard.currentX = startPos.left
            this.drawingCard.currentY = startPos.top
            this.drawingCard.width = drawPileElement.offsetWidth

            this.drawingCard.drawingCardFlippingDeg = 0
            await this.sleep(250)

            if(this.currentPlayer == this.yourPlayer){
                this.drawingCard.drawingCardFlippingDeg = 180
    
                handsContainerElement = document.querySelector('.hands-container');
                const rect = handsContainerElement.getBoundingClientRect();
                const destinationCardWidth = handsContainerElement.querySelector('.gameCard').offsetWidth

                const cardRect = handsContainerElement.querySelector('.gameCard').getBoundingClientRect();
    
                this.drawingCard.currentX = rect.right - destinationCardWidth
                this.drawingCard.currentY = cardRect.top
                this.drawingCard.width = destinationCardWidth
            }else if(this.currentPlayer !== this.yourPlayer){
    
                landingContainerElemenet = document.querySelector(`#player-${this.currentPlayer.name} .king-img`);
                const rect = landingContainerElemenet.getBoundingClientRect();
                const destinationContainerWidth = landingContainerElemenet.offsetWidth
                const destinationContainerHeight = landingContainerElemenet.offsetHeight
    
                this.drawingCard.currentX = rect.left + (destinationContainerWidth /2)
                this.drawingCard.currentY = rect.top + (destinationContainerHeight /2)
                this.drawingCard.width = 0
            }

            await this.sleep(this.animationSpeed)

            this.drawingCard.gettingDrawn = false
            this.drawingCard.updatedAt = Date.now()
            // await this.sleep(40000)
            this.drawingCard.location = this.currentPlayer.name
            this.yourPlayer.hasUsedEcard = false
            
        },
        getFixedPosition(element) {
            const rect = element.getBoundingClientRect();
            return {
                top: rect.top,
                left: rect.left,
            };
        },

        async trashCard(card,notSkipping,activeCard){

            const tempCard = card ?? this.pickedCard;
            tempCard.location = 'moving' 
            
            this.movingCard.hasDestination = false

            this.movingCard.setUpBy = this.currentPlayer
            tempCard.trashLocationX = Math.random() * 38 + 2
            tempCard.trashLocationY = Math.random() * 33 + 2
            
            const maxDeg = 20;
            this.movingCard.rotation = 0
            
            if(activeCard || this.movingCard.setUpBy.name == this.yourPlayer.name){
                const cardElement = document.querySelector(`#card-${tempCard.id}`)
                const startPos = cardElement.getBoundingClientRect()
    
                this.movingCard.currentX = startPos.left
                this.movingCard.currentY = startPos.top

                handsContainerElement = document.querySelector('.hands-container');
                const destinationCardWidth = handsContainerElement.querySelector('.gameCard').offsetWidth
                this.movingCard.width = destinationCardWidth
            }else {
                this.movingCard.width = 0

                const playerContainer = document.querySelector(`#player-${this.movingCard.setUpBy.name} .king-img`);
                const rect = playerContainer.getBoundingClientRect();
                const destinationCardWidth = playerContainer.offsetWidth
                const destinationCardHeight = playerContainer.offsetHeight

                this.movingCard.currentX = rect.left + (destinationCardWidth /2)
                this.movingCard.currentY = rect.top + (destinationCardHeight /2)

                
                await this.sleep(1)
                this.movingCard.width = 100 * .7;

                this.movingCard.currentX = rect.left + (rect.width/2) - (this.movingCard.width /2)
                this.movingCard.currentY = rect.top + (rect.height/2) - (this.movingCard.width * 1.3 /2)
            }

            

            landingContainerElemenet = document.querySelector(`.trash-area`);
            const rect = landingContainerElemenet.getBoundingClientRect();
            const destinationCardWidth = landingContainerElemenet.offsetWidth
            const destinationCardHeight = landingContainerElemenet.offsetHeight

            this.movingCard.finalX = rect.left + (destinationCardWidth * (this.movingCard.trashLocationX / 100))
            this.movingCard.finalY = rect.top + (destinationCardHeight * (this.movingCard.trashLocationY / 100))
            this.movingCard.finalRotation = Math.round(Math.random() * maxDeg - (maxDeg / 2));
            this.movingCard.finalWidth = 100 * .7;
            this.movingCard.updatedAt = Date.now();

            await this.sleep(250)

            this.movingCard.hasDestination = true

            await this.sleep(650)

            
            


            // -------------------------
            this.movingCard.usingCard = false
            this.movingCard.picked = false
            
            this.movingCard.location = 'trash'
            this.currentPlayer.hasMadeMove = true

            
            await this.sleep(this.aiSpeed)
            
            if(!notSkipping) this.goToNextPlayer()


        },

        // =========================================
        async goToNextPlayer() {
            // Move to the next player, wrapping around if necessary
            this.currentPlayer.isRevealing = false
            this.currentPlayer.hasDrawn = false
            this.currentPlayer.hasMadeMove = false
            this.currentPlayer.hasUsedEcard = false

            if(this.movingCard) this.movingCard.location = null

            for(let card of this.deck){
                card.picked = false
                card.usingCard = false
            }

            if(this.playerHands(this.currentPlayer.name).length !== 5){
                await this.sleep(this.aiSpeed)
            }

            if(this.drawPile.length == 0){
                await this.sleep(500)
                alert('山札がなくなったのでゲーム終了です\n\n' + this.rankingText)
                // this.currentPlayerIndex = this.players.length

                return 
            }

            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
            if(this.currentPlayer.isAI) this.aiMove()
        },

        buttonCheck(action) {

            if (action === 'trash') {
                if(this.currentPlayer.hasMadeMove && this.pickedCard && this.playerHands(this.currentPlayer.name).length > 5) return true
                return this.pickedCard && !this.currentPlayer.hasMadeMove;
            }

            if (action === 'use') {
                if(!this.pickedCard) return false
                if(this.playerHands(this.currentPlayer.name).length <= 5) return false

                
                if(this.pickedCard.type == 'food') {
                    const kingFood1 = this.food[this.currentPlayer.king.foodRequirements[0]].name
                    const kingFood2 = this.food[this.currentPlayer.king.foodRequirements[1]].name
    
                    if(this.pickedCard.name == kingFood1 || this.pickedCard.name == kingFood2) return true

                    return false
                    
                }

                if(this.pickedCard.type == 'able') {
                    for(let baby of this.currentPlayer.babies){
                        if(baby.isBlocked) return true
                    }
                    return false
                }

                if(this.pickedCard.type !== "food") {
                    if(this.yourPlayer.hasUsedEcard) return false
                }


                return true
            }

            if(action === 'buttons'){
                if(this.currentPlayer !== this.yourPlayer) return false
                if(this.movingCard) return false
                if(!this.currentPlayer.hasDrawn) return false
                if(this.drawingCard) return false
                if(this.currentPlayer.hasMadeMove) return false

                if(this.pickedCard) return true
            }

            return false;
        },
        pickCard(card){
            if(this.currentPlayer !== this.yourPlayer) return
            if(!this.currentPlayer.hasDrawn) return
            if(this.movingCard) return
            if(card.picked) {
                card.picked = false 
                card.usingCard = false 
                return 
            }
            this.unPickAllCards()
            
            card.picked = true
        },
        useCard(){
            this.pickedCard.usingCard = true
        },
        cancelCard(){
            if(!this.activeCard) return
            this.activeCard.usingCard = false
            this.pickedCard.picked = false
        },
        unPickAllCards(){
            for(let i in this.deck){
                let card = this.deck[i]
                card.picked = false
                card.usingCard = false 
            }
        },

        
        retriveCheck(){
            if(!this.topTrashCard) false
            if(this.topTrashCard?.type !== 'food') return false

            return true
        },
        async retriveFood(){
            if(this.activeCard?.type !== 'energy') return

            await this.trashCard(this.activeCard,true)

            let tempCard = this.trashPile[this.trashPile.length - 2]
            
            const rectTempCard = document.querySelector(`#card-${tempCard.id}`).getBoundingClientRect();
            const tempCardRotation = tempCard.rotation

            
            await this.sleep(500)

            tempCard.location = 'moving'
            this.movingCard.updatedAt = Date.now()
            this.hasDestination = false

            
            this.movingCard.currentX = `left: ${rectTempCard.left}px`;
            this.movingCard.currentY = `top: ${rectTempCard.top}px`;
            this.movingCard.width = rectTempCard.width;
            this.movingCard.rotation = tempCardRotation;

            // ----------------

            // const finalWidth = 0
            // const finalHeight = finalWidth * 1.33


            await this.sleep(10)

            if(this.currentPlayer == this.yourPlayer){
    
                handsContainerElement = document.querySelector('.hands-container');
                const rect = handsContainerElement.getBoundingClientRect();
                const destinationCardWidth = handsContainerElement.querySelector('.gameCard').offsetWidth

                const cardRect = handsContainerElement.querySelector('.gameCard').getBoundingClientRect();
    
                this.movingCard.finalX = rect.right - destinationCardWidth
                this.movingCard.finalY = cardRect.top
                this.movingCard.finalWidth = destinationCardWidth
                this.movingCard.finalRotation = 0
            }else{
                const playerContainer = document.querySelector(`#player-${this.currentPlayer.name} .king-img`);
                const rect = playerContainer.getBoundingClientRect();
                const destinationCardWidth = playerContainer.offsetWidth
                const destinationCardHeight = playerContainer.offsetHeight

                this.movingCard.finalX = rect.left + (destinationCardWidth /2)
                this.movingCard.finalY = rect.top + (destinationCardHeight /2)
                this.movingCard.finalWidth = 0;
                this.movingCard.finalRotation = 0
            }

            await this.sleep(750)

            this.movingCard.hasDestination = true
            
            this.movingCard.location = this.currentPlayer.name
            this.yourPlayer.hasUsedEcard = true
            await this.sleep(250)
            this.currentPlayer.hasMadeMove = false

            

        },

        async interactBaby(baby,player,babyIndex){
            if(this.gameStatus !== 'distributed') return
            if(player !== this.currentPlayer) return

            

            if(this.activeCard?.type == 'food') {
                if(baby.isBlocked) return
                if(baby.foodArray.length >= 2) return
                if(this.movingCard)  return

                this.activeCard.location = 'moving'
                this.movingCard.hasDestination = false
                this.movingCard.setUpBy = this.currentPlayer

                if(this.movingCard.setUpBy == this.yourPlayer){
                    const cardElement = document.querySelector(`#card-${this.activeCard.id}`)
                    const startPos = cardElement.getBoundingClientRect();
        
                    this.movingCard.currentX = startPos.left
                    this.movingCard.currentY = startPos.top

                    handsContainerElement = document.querySelector('.hands-container');
                    const destinationCardWidth = handsContainerElement.querySelector('.gameCard').offsetWidth
                    this.movingCard.width = destinationCardWidth
                }else {
                    this.movingCard.width = 0

                    const playerContainer = document.querySelector(`#player-${this.movingCard.setUpBy.name} .king-img`);
                    const rect = playerContainer.getBoundingClientRect();
                    const destinationCardWidth = playerContainer.offsetWidth
                    const destinationCardHeight = playerContainer.offsetHeight

                    this.movingCard.currentX = rect.left + (destinationCardWidth /2)
                    this.movingCard.currentY = rect.top + (destinationCardHeight /2)

                    await this.sleep(1)
                    this.movingCard.width = 100 * .7;

                    this.movingCard.currentX = rect.left + (rect.width/2) - (this.movingCard.width /2)
                    this.movingCard.currentY = rect.top + (rect.height/2) - (this.movingCard.width * 1.3 /2)
                }

                const endPosElement = document.querySelector(`#${this.currentPlayer.name}-baby-${babyIndex} img`);
        
                const rect = endPosElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                this.movingCard.finalX = `${centerX}`;
                this.movingCard.finalY = `${centerY}`;
                
                this.movingCard.finalWidth = 0

                await this.sleep(250)

                this.movingCard.hasDestination = true

                

                await this.sleep(this.animationSpeed - 50)
                
                
                baby.foodArray.push(this.activeCard)
                this.currentPlayer.hasMadeMove = true
                
                this.activeCard.usingCard = false
                this.pickedCard.pickCard = false
                this.pickedCard.location = null

                await this.sleep(750)

                this.goToNextPlayer()
            }

 
            if(this.activeCard?.type == 'able') {
                if(!baby.isBlocked) return

                this.activeCard.location = 'moving'
                this.movingCard.hasDestination = false
                this.movingCard.setUpBy = this.currentPlayer

                if(this.movingCard.setUpBy == this.yourPlayer){
                    const cardElement = document.querySelector(`#card-${this.activeCard.id}`)
                    const startPos = cardElement.getBoundingClientRect();
        
                    this.movingCard.currentX = startPos.left
                    this.movingCard.currentY = startPos.top

                    handsContainerElement = document.querySelector('.hands-container');
                    const destinationCardWidth = handsContainerElement.querySelector('.gameCard').offsetWidth
                    this.movingCard.width = destinationCardWidth
                }else {
                    this.movingCard.width = 0

                    const playerContainer = document.querySelector(`#player-${this.movingCard.setUpBy.name} .king-img`);
                    const rect = playerContainer.getBoundingClientRect();
                    const destinationCardWidth = playerContainer.offsetWidth
                    const destinationCardHeight = playerContainer.offsetHeight

                    this.movingCard.currentX = rect.left + (destinationCardWidth /2)
                    this.movingCard.currentY = rect.top + (destinationCardHeight /2)

                    await this.sleep(1)
                    this.movingCard.width = 100 * .7;

                    this.movingCard.currentX = rect.left + (rect.width/2) - (this.movingCard.width /2)
                    this.movingCard.currentY = rect.top + (rect.height/2) - (this.movingCard.width * 1.3 /2)
                }

                const endPosElement = document.querySelector(`#${this.currentPlayer.name}-baby-${babyIndex} img`);
        
                const rect = endPosElement.getBoundingClientRect();
                this.movingCard.finalWidth = 15;
                this.movingCard.finalX = rect.left + rect.width / 2 - (this.movingCard.finalWidth/2);
                this.movingCard.finalY = rect.top + rect.height / 2 - ((this.movingCard.finalWidth/2) * (3/4));

                await this.sleep(500)

                this.movingCard.hasDestination = true

                

                await this.sleep(750)
                baby.isBlocked = false



                await this.trashCard(this.movingCard,false,true)


                this.currentPlayer.hasMadeMove = true
            }

            // await this.drawCard()
        },

        async randomObstacle(mode){
            if(this.activeCard.type !== 'obstacle') return

            if(mode == 'fast'){
                const randomIndex = Math.floor(Math.random() * this.players.length);
                this.chosenPlayer = this.players[randomIndex];
            }else{
                // this.drawingCardYCoordinate = `top: ${startPos.top}px`;
                // this.drawingCardXCoordinate = `left: ${startPos.left}px`;
                // this.drawingCardWidth = document.querySelector(`#card-${this.activeCard.id}`).offsetWidth -2;
                this.activeCard.location = 'moving'
                this.activeCard.hasDestination = false

                
                let startPos
                if(this.currentPlayer == this.yourPlayer){
                    startPos = document.querySelector(`#card-${this.activeCard.id}`).getBoundingClientRect();
                    
                    this.movingCard.currentY = startPos.top
                    this.movingCard.currentX = startPos.left
                    this.movingCard.width = startPos.width
                }else{

                    startPos = document.querySelector(`#player-${this.currentPlayer.name} .king-img`).getBoundingClientRect();

                    this.movingCard.width = 0
                    this.movingCard.currentY = startPos.top + (startPos.height/2)
                    this.movingCard.currentX = startPos.left + (startPos.width/2)

                    await this.sleep(10)
                }


                // ----------------------------------------
                const endPos = document.querySelector('#drawPileBase .gameCard').getBoundingClientRect();


                this.movingCard.finalY = endPos.top
                this.movingCard.finalX = endPos.left
                this.movingCard.finalWidth = endPos.width / 4
                // this.movingCard.finalWidth = 25

                await this.sleep(500)
                this.activeCard.hasDestination = true

                await this.sleep(500)
    
                let tempPlayerIndex = await this.rollDice()
                // Ensure the final chosenPlayer is selected after the loop
                this.chosenPlayer = this.players[tempPlayerIndex];
                await this.sleep(this.animationSpeed)

            }

            let blockFlag = false
            let babyCount = 0
            let babyTarget

            if(this.chosenPlayer){
                for (let baby of this.chosenPlayer.babies) {
                    if (!baby.isBlocked && baby.foodArray.length !== 2) {
                        babyTarget = baby
                      blockFlag = true
                      break; // Exit the loop after finding the first unblocked baby
                    }
    
                    babyCount++
                }
                
            }
    
            if(blockFlag) { 
                await this.sleep(100)

                const endPosElement = document.querySelector(`#${this.chosenPlayer.name}-baby-${babyCount} img`);
        
                const rect = endPosElement.getBoundingClientRect();
                
                this.movingCard.finalX = rect.left + (rect.width /2)
                this.movingCard.finalY = rect.top + (rect.height /2)
                this.movingCard.finalWidth = 0

                if(mode == 'fast'){
                    await this.sleep(100)
                }else{
                    await this.sleep(this.animationSpeed)
                }
                
                babyTarget.isBlocked = true;
            }else{
                await this.trashCard(this.movingCard,true,true)

                this.currentPlayer.hasMadeMove = true
                this.chosenPlayer = null
                await this.sleep(this.animationSpeed)
                await this.goToNextPlayer();

                return
            
            }


            // this.pickedCard.location = null

            this.activeCard.usingCard = false
            this.pickedCard.pickCard = false
            
            this.currentPlayer.hasMadeMove = true
            this.chosenPlayer = null
            await this.sleep(this.animationSpeed)

            await this.goToNextPlayer();
        },

        async rollDice() {
            this.isDieCast = true
            await this.sleep(250)
            const diceOne = Math.floor((Math.random() * 6) + 1);
            // const diceOne = 5
            // let diceOne
            // let count = 0
            // for(let i in this.players){
            //     let tempPlayer = this.players[i]
            //     if(tempPlayer == this.yourPlayer) {
            //         diceOne = count+1
            //         break;
            //     }

            //     count++

            // }
            const minRotationDifference = 720; // Minimum rotation difference to ensure a noticeable roll
            const randomX = (Math.floor(Math.random() * 5)+ 5) * 360; // Random multiple of 90 degrees
            const randomY = (Math.floor(Math.random() * 5)+ 5) * 360; // Random multiple of 90 degrees

            // Ensure the rotation is more than 360 degrees from the previous result
            const finalRotation = this.rotations[diceOne];
            const finalRotationX = parseInt(finalRotation.match(/rotateX\((-?\d+)deg\)/)[1]);
            const finalRotationY = parseInt(finalRotation.match(/rotateY\((-?\d+)deg\)/)[1]);

            // Combine initial random rotations with final rotations
            let combinedRotationX = randomX + finalRotationX;
            let combinedRotationY = randomY + finalRotationY;

            // Ensure the new rotations differ by at least 360 degrees
            if (Math.abs(combinedRotationX - this.previousRotationX) < minRotationDifference) {
                combinedRotationX += minRotationDifference;
            }
            if (Math.abs(combinedRotationY - this.previousRotationY) < minRotationDifference) {
              combinedRotationY += minRotationDifference;
            }

            this.finalCombinedRotationX = combinedRotationX
            this.finalCombinedRotationY = combinedRotationY

            await this.sleep(4000)

            this.isDieCast = false

            // Store the current rotation values for the next roll
            this.previousRotationX = this.finalCombinedRotationX;
            this.previousRotationY = this.finalCombinedRotationY;

            return diceOne -1
        },

        async aiMove(){
                
            await this.drawCard()

            let hasAutomated = false;
            

            await this.sleep(this.aiSpeed)

            
            

            // eCard automation
            if(!this.currentPlayer.hasUsedEcard && this.retriveCheck()){
                for(let card of this.playerHands(this.currentPlayer.name)){
                    if(card.type == 'energy') {
                        if(this.food[this.currentPlayer.king.foodRequirements[0]].name == this.topTrashCard?.name || this.food[this.currentPlayer.king.foodRequirements[1]].name == this.topTrashCard?.name){
                            card.picked = true
                            this.useCard()
                            await this.retriveFood()
                            return  this.aiMove()
                        }
                        
                        break;
                    }
                }
            }

            
            // feeding Automation
            for(let card of this.playerHands(this.currentPlayer.name)){
                if(card.type == 'food') {
                    if(this.food[this.currentPlayer.king.foodRequirements[0]].name == card.name || this.food[this.currentPlayer.king.foodRequirements[1]].name == card.name){
                        let count = 0
                        for(let baby of this.currentPlayer.babies){
                            if(!baby.isBlocked && baby.foodArray?.length < 2 && !hasAutomated){
                                card.picked = true
                                this.useCard()
                                await this.interactBaby(baby,this.currentPlayer,count)
                                hasAutomated = true
                                
                                await this.sleep(this.aiSpeed)
                                return;
                            }
                            count++
                        }
                    }
                }
            }

            // able card automation
            if(!hasAutomated){

                for(let card of this.playerHands(this.currentPlayer.name)){
                    if(card.type == 'able' && !hasAutomated) {   
                        let count = 0 
                        for(let baby of this.currentPlayer.babies){
                            if(baby.isBlocked){
                                card.picked = true
                                await this.sleep(this.aiSpeed)
                                this.useCard()

                                await this.interactBaby(baby,this.currentPlayer,count)

                                return;
                            }
                            count++
                        }


                    }
                }
            }

            // obstacle automation
            for(let card of this.playerHands(this.currentPlayer.name)){
                if(card.type == 'obstacle') {
                    card.picked = true;
                    await this.sleep(this.aiSpeed)
                    this.useCard()

                    await this.randomObstacle();
                    return;
                }
            }

            
            // trash any unnecesry card Automation
            for(let card of this.playerHands(this.currentPlayer.name)){
                if(card.type == 'food'){
                    card.picked = true
                    await this.trashCard()
                    return;
                }
            }

            // just trash anything Automation
            this.playerHands(this.currentPlayer.name)[0].picked = true
            await this.trashCard()
            return
            
        },

        async getDetail(){
            console.log(this.players)
            console.log(`--------`)
            console.log(this.deck)
        }
        
    },
    async mounted(){
        this.addPlayer();

        if(this.developingMode) {
            this.goToGamePage()
            this.aiSpeed = 0
            // this.aiSpeed = 250
            this.animationSpeed = 500
            this.animationSpeed = 750
        }
        
    },
});

// Register Vue component globally
app.component('game-card', {
    props: ['card'],
    methods:{
        getBackgroundColor(card){
            let color

            switch(card.type){
                case  'food' : 
                    color = 'HotPink';
                    break;

                case  'energy' : 
                    color = 'yellow';
                    break;

                case  'obstacle' : 
                    color = 'Chocolate';
                    break;
                
                case  'able' : 
                    color = 'forestGreen';
                    break;
            
                default :
                    color = 'black';
                    break;
            }

            return { backgroundColor: color };

        },
    },
    template: `
        <div class="gameCard" :id="'card-' + card.id">
            <div class="card-front">
                <div class="gameCard-top-block" :style="getBackgroundColor(card)">
                    <span v-if="card.type === 'food'">{{ card.name }}</span>
                    <span v-else-if="card.type === 'energy'">Eチェンジ</span>
                    <span v-else-if="card.type === 'obstacle'">環境破壊</span>
                    <span v-else-if="card.type === 'able'">できること</span>
                    <span v-else>{{ card.type }}</span>
                </div>
                <div class="gameCard-middle-block">
                    <img :src="card?.imgSrc" class="card-front-img">
                </div>
                <div class="gameCard-bottom-block" :style="getBackgroundColor(card)">
                    <span v-if="card.type === 'food'">食べ物</span>
                    <span v-else>{{ card.name }}</span>
                </div>
            </div>
        </div>
    `
});  


app.mount('#app');