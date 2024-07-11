
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
                {name:'障害',imgSrc: './assets/image/able-1.jpg'},
                {name:'障害',imgSrc: './assets/image/able-2.jpg'},
            ],

            deck:[],

            maxDarkness: 0.5,

            drawingCardXCoordinate: 0,
            drawingCardYCoordinate: 0,
            drawingCardFlippingDeg: 0,

            movingCardXCoordinate: 0,
            movingCardYCoordinate: 0,
            movingCardWidth: 0,
            movingCardRotation: 0,

            animationSpeed: 750,

        };
    },
    computed: {
        readyToPlay() {
            const namePattern = /^[^\s!@#$%^&*(),.?":{}|<>]+$/;
            const uniquerandomNames = new Set(this.players.map(player => player.name.trim()));
            
            return this.players.length >= 2 &&
                this.players.length <= 5 &&
                uniquerandomNames.size === this.players.length &&
                this.players.every(player => 
                    player.name.trim() !== '' && 
                    namePattern.test(player.name)
                );
        },

        currentPlayer() {
            return this.players[this.currentPlayerIndex];
        },

        drawPile() {
            return this.deck.filter(card => card.location === 'drawPile');
        },

        drawPileLength() {
            return this.deck.filter(card => card.location === 'drawPile' && !card.gettingDrawn).length;
        },


        trashPile() {
            return this.deck.filter(card => card.location === 'trash');
        },
        foodTrash() {
            const foodTrash = this.deck.filter(card => card.location === 'trash' && card.type === 'food');
            const groupedByName = foodTrash.reduce((acc, card) => {
                if (!acc[card.name]) {
                    acc[card.name] = [];
                }
                acc[card.name].push(card);
                return acc;
            }, {});
            return Object.values(groupedByName);
        },
        otherTrashPile() {
            return this.deck
                .filter(card => card.location === 'trash' && card.type !== 'food')
                .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)); // Reverse order
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
            return this.deck.find(card => card.isMoving) || null;
        },

    },
    watch: {
        drawPile(newVal) {
            if(this.gameStatus !== 'distributed') return

            if (newVal.length === 0) {
                this.gameStatus = 'ended'
                alert('The draw pile is empty!');
            }
        },
        players: {
            handler: async function(newVal) {
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
            this.players.push({ name: randomName });
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

        getPlayerStyle(player, index) {
            const style = {
              borderColor: player.color
            };

            if(this.chosenPlayer){
                if(player.name !== this.chosenPlayer.name){
                    style.backgroundColor = 'dimGray';
                    style.opacity = '0.5';
                    style.transition = 'all .05s';
                    return style
                }
                return style
            } 

            if (player !== this.currentPlayer) {
              style.backgroundColor = 'dimGray';
              style.opacity = '0.75';
            }
        
            return style;
        },
        async goToGamePage() {
            if (!this.readyToPlay) return;

            // Shuffle and assign colors
            this.gameStatus = 'setting up game'
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
                        await this.sleep(20); // Add delay if needed
                    }
                }
            }

            this.gameStatus = 'distributed'
        },

        async drawCard(){
            if(this.gameStatus !== 'distributed' || this.drawPile.length == 0) return
            
            if(!this.playerHands(this.playerHands(this.currentPlayer.name[0])))return

            if(this.currentPlayer.hasDrawn) return

            this.drawPile[0].gettingDrawn = true
            this.currentPlayer.hasDrawn = true
            this.currentPlayer.isRevealing = true

            // Set initial position
            const drawPileBaseLocation = this.$el.querySelector('#drawPileBase');
            const startPos = this.getFixedPosition(drawPileBaseLocation);
            this.drawingCardXCoordinate = startPos.left;
            this.drawingCardYCoordinate = startPos.top;
            this.drawingCardFlippingDeg = 0
            await this.sleep(0)
            this.drawingCardFlippingDeg = 180
            await this.sleep(this.animationSpeed)
            await this.moveToHand();

            this.drawPile[0].gettingDrawn = false
            this.drawPile[0].updatedAt = Date.now()
            this.drawPile[0].location = this.currentPlayer.name
            
            
        },
        getFixedPosition(element) {
            const rect = element.getBoundingClientRect();
            return {
                top: rect.top,
                left: rect.left
            };
        },
        async moveToHand() {
            const gameCardContainerElement = this.$el.querySelector('.gameCard-container');
            const gameCardElement = gameCardContainerElement.querySelector('.gameCard:last-child');
            const endPos = this.getFixedPosition(gameCardElement);
            this.drawingCardXCoordinate = endPos.left;
            this.drawingCardYCoordinate = endPos.top;
            
            await this.sleep(this.animationSpeed);
        },
        getMovingStyle() {
            return {
                position: 'fixed',
                top: `${this.drawingCardYCoordinate}px`,
                left: `${this.drawingCardXCoordinate}px`,
                transform: `rotateY(-${this.drawingCardFlippingDeg}deg)`,
                zIndex: 100,
                transition: `all ${this.animationSpeed/1000 - .05}s`
            };
        },

        async trashCard(card){

            const tempCard = card ?? this.pickedCard;
            
            const verticalPosition = (Math.random() * 45);
            const horizontalPosition = (Math.random() * 46);

            const vert = Math.random() < 0.05 ? 'top' : 'bottom'
            const horizon = Math.random() < 0.5 ? 'left' : 'right'
            
            tempCard.verticalPosition = `${vert}: ${verticalPosition}%`;
            tempCard.horizontalPosition = `${horizon}: ${horizontalPosition}%`;
            
            const maxDeg = 45;
            tempCard.rotation = Math.round(Math.random() * maxDeg - (maxDeg / 2));

            tempCard.isMoving = true

            
            

            // Set initial position ------------------
            // const drawPileBaseLocation = this.$el.querySelector('#drawPileBase');
            const startPos = this.getFixedPosition(this.$el.querySelector(`#card-${tempCard.id}`));
            this.movingCardYCoordinate = `top: ${startPos.top}px`;
            this.movingCardXCoordinate = `left: ${startPos.left}px`;
            this.movingCardWidth = this.$el.querySelector(`#card-${tempCard.id}`).offsetWidth -2;
            
            this.movingCardRotation = 0
            await this.sleep(100)

            const finalWidth = 50
            const finalHeight = finalWidth * 1.33

            if(tempCard.type !== 'food'){
                
                this.movingCardRotation = tempCard.rotation

                const trashContainer = this.$el.querySelector('.other-trash-area-container');
                const rect = trashContainer.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;
                const top = rect.top;
                const left = rect.left;

                let tempXcordinate = horizon == 'left' 
                ?  left + width * (horizontalPosition / 100)
                : left + width -(width * (horizontalPosition / 100))  - finalWidth - 2

                let tempYcordinate = vert == 'top' 
                ?  top + height * (verticalPosition / 100) 
                : top + height -(height * (verticalPosition / 100)) - finalHeight -2

                this.movingCardXCoordinate = `left: ${tempXcordinate}px`;
                this.movingCardYCoordinate = `top: ${tempYcordinate}px`;
            }else{
                const endPosElement = this.$el.querySelector('.main-area .main-grid');
    
                const rect = endPosElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                this.movingCardYCoordinate = `top: ${centerY}px`;
                this.movingCardXCoordinate = `left: ${centerX}px`;
            }

            this.movingCardWidth = finalWidth;

            
            await this.sleep(1200);
            
            tempCard.isMoving = false

            // -------------------------

            tempCard.location = 'trash'
            tempCard.updatedAt = Date.now();
            

            tempCard.usingCard = false
            tempCard.picked = false

            this.currentPlayer.hasMadeMove = true


        },
        getMovingLocation(){
            this.drawPileBase = this.$el.querySelector('#drawPileBase');
            this.gameCardContainer = this.$el.querySelector('.gameCard-container');
            this.gameCard = this.gameCardContainer.querySelector('.gameCard:last-child');

            this.calculateStyles(this.drawPileBase);

            if (!this.isAnimating) {
                this.isAnimating = true;
                setTimeout(() => {
                  this.isAnimating = false;
                }, this,animationSpeed);
                return this.calculateStyles(this.drawPileBase);
              } else {
                return this.calculateStyles(this.gameCard);
            }
        },
        getMovingCardLocation(){
            return {
                position: 'absolute',
                ...this.parsePosition(this.movingCardYCoordinate),
                ...this.parsePosition(this.movingCardXCoordinate),
                width: this.movingCardWidth + 'px',
                transform: 'rotate(' + this.movingCardRotation + 'deg)'
            };
        },
        parsePosition(position) {
            const [property, value] = position.split(': ');
            return { [property]: value };
        },

        calculateStyles(element) {
            const rect = element.getBoundingClientRect();
            return {
                position: 'fixed',
                top: `${rect.top}px`,
                left: `${rect.left}px`,
                transition: 'all 0.5s'
            };
        },

        async goToNextPlayer() {
            // Move to the next player, wrapping around if necessary
            this.currentPlayer.isRevealing = false
            this.currentPlayer.hasDrawn = false
            this.currentPlayer.hasMadeMove = false

            for(let card of this.deck){
                card.picked = false
                card.usingCard = false
            }

            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        },
        getBorderStyle(baby,player){

            return {
                borderColor: player.color,
                borderWidth: baby.foodArray.length == 2 ? '0px' : '2.5px',
                opacity: baby.foodArray.length == 2? '1' : '0.8'
            };

            
        },
        getClass(baby) {
            let className = 'baby-img-container';
            if (baby.foodArray.length == 2) {
                className = 'baby-grown-img-container';
            }
            return className;
        },
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
            
                default :
                    color = 'black';
                    break;
            }

            return { backgroundColor: color };

        },
        calculateCardPosition(index, totalCards, card) {
            if(card.usingCard){
                return {
                    left: '10%',
                    zIndex: 20,
                };
            }
            const percentage = (100 / (totalCards - 1)) * index;

            let topPosition = 0
            let zIndex = 0
            if(card?.picked){
                topPosition = -30
                zIndex = 1
            }

            return {
                top: `${topPosition}%`,
                left: `${percentage}%`,
                transform: `translateX(-${percentage}%)`,
                zIndex,
            };
        },
        getTrashPosition(card,index) {
            return `
                transform: rotate(${card?.rotation}deg); 
                ${card.verticalPosition};
                ${card.horizontalPosition};
            `;
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


                return true
            }

            if (action === 'goToNext') {
                return this.currentPlayer?.hasMadeMove && this.playerHands(this.currentPlayer.name).length == 5;
            }

            if(action === 'buttons'){
                if(!this.currentPlayer.hasDrawn) return false

                if(this.currentPlayer.hasMadeMove) return true

                if(this.activeCard) return false


                if(this.pickedCard) return true
            }

            return false;
        },
        pickCard(card){
            if(!this.currentPlayer.hasDrawn) return
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

        

        async retriveFood(card){
            if(this.activeCard?.type !== 'energy') return

            await this.trashCard(this.activeCard)
            
            card.updatedAt = Date.now()
            card.location = this.currentPlayer.name
        },

        async interactBaby(baby,player){
            if(this.gameStatus !== 'distributed') return
            if(this.currentPlayer.name !== player.name) return

            if(this.activeCard?.type == 'food') {
                if(baby.isBlocked) return
                if(baby.foodArray.length >= 2) return
                
                
                baby.foodArray.push(this.activeCard)
    
                this.activeCard.usingCard = false
                this.pickedCard.pickCard = false
                this.pickedCard.location = null
    
                this.currentPlayer.hasMadeMove = true
            }


            if(this.activeCard?.type == 'able') {
                if(!baby.isBlocked) return 

                card = baby.isBlocked
                await this.trashCard(card)

                baby.isBlocked = false
    
                this.pickedCard.usingCard = false
                this.pickedCard.pickCard = false

                await this.trashCard(this.pickedCard)
    
                this.currentPlayer.hasMadeMove = true
            }

            // await this.drawCard()
        },

        async randomObstacle(){
            if(this.activeCard.type !== 'obstacle') return

            // const totalRounds = Math.floor(Math.random() * 20) + 30; // Random total iterations between 30 and 50
            const totalRounds = Math.floor(Math.random() * 6) + 12; // Random total iterations between 30 and 50
            const startInterval = Math.random() * 10 + 20; // Random start interval between 20 and 30 ms
            const endInterval = 200; // End interval in milliseconds
            let tempPlayerIndex = this.currentPlayerIndex; // Use a temporary index for the roulette effect

            for (let i = 0; i < totalRounds; i++) {
                tempPlayerIndex = (tempPlayerIndex + 1) % this.players.length;
                this.chosenPlayer = this.players[tempPlayerIndex];

                const progress = i / totalRounds;
                const interval = startInterval + (endInterval - startInterval) * progress; // Linear easing
                await this.sleep(interval);
            }

            // Ensure the final chosenPlayer is selected after the loop
            this.chosenPlayer = this.players[tempPlayerIndex];

            await this.sleep(1000)

            let blockFlag = false
            for (let baby of this.chosenPlayer.babies) {
                if (!baby.isBlocked && baby.foodArray.length == 0) {
                  baby.isBlocked = this.activeCard;
                  blockFlag = true
                  break; // Exit the loop after finding the first unblocked baby
                }
            }

            this.activeCard.usingCard = false
            this.pickedCard.pickCard = false
            if(blockFlag) this.pickedCard.location = null
            
            
            await this.sleep(1000)
            this.chosenPlayer = null

            this.currentPlayer.hasMadeMove = true
        },
        
    },
    async mounted(){

        if(this.developingMode){
            for (let i = 0; i < this.defaultNumber; i++) {
                this.addPlayer();
            }

            await this.goToGamePage()
        }


        

        // if(this.developingMode){
        //     const ogSpeed = this.animationSpeed
        //     this.animationSpeed = 50
        //     for (let i = 0; i < 5; i++) {
        //         await this.drawCard()
        //         this.playerHands(this.currentPlayer.name)[0].picked = true
        //         this.trashCard()
        //         this.goToNextPlayer()
        //     }
            
        //     this.animationSpeed = ogSpeed
        // }
        
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
            <div class="card-front" :style="getBackgroundColor(card)">
                <div class="gameCard-top-block">
                    <span v-if="card.type === 'food'">{{ card.name }}</span>
                    <span v-else-if="card.type === 'energy'">Eチェンジ</span>
                    <span v-else-if="card.type === 'obstacle'">環境破壊</span>
                    <span v-else>{{ card.type }}</span>
                </div>
                <div class="gameCard-middle-block">
                    <img :src="card?.imgSrc" class="card-front-img">
                </div>
                <div class="gameCard-bottom-block">
                    <span v-if="card.type === 'food'">{{ card.type }}</span>
                    <span v-else>{{ card.name }}</span>
                </div>
            </div>
        </div>
    `
});         


app.mount('#app');