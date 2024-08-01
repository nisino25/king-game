
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

            drawingCardXCoordinate: 0,
            drawingCardYCoordinate: 0,
            drawingCardFlippingDeg: 0,

            drawingCardXCoordinate: 0,
            drawingCardYCoordinate: 0,
            drawingCardWidth: 0,
            drawingCardRotation: 0,

            animationSpeed: 600,

            aiSpeed: 500,

            // ---------------------
            userName: null,

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

        drawPileLength() {
            return this.deck.filter(card => card.location === 'drawPile' && !card.gettingDrawn).length;
        },


        trashPile() {
            return this.deck
            .filter(card => card.location === 'trash')
            .sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
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
                style.zIndex = 100
            }

            

            if(card.usingCard){
                style.left =  '10%'
                style.transform = 'unset'
                style.zIndex = 20
            }
            
        
            return style;
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
            const drawPileElement = this.$el.querySelector('#drawPileBase .gameCard');
            const startPos = this.getFixedPosition(drawPileElement);
            this.drawingCardXCoordinate = startPos.left;
            this.drawingCardYCoordinate = startPos.top;

            this.drawingCard.currentX = startPos.left
            this.drawingCard.currentY = startPos.top
            this.drawingCard.width = drawPileElement.offsetWidth

            this.drawingCard.drawingCardFlippingDeg = 0
            await this.sleep(250)

            if(this.currentPlayer == this.yourPlayer){
                this.drawingCard.drawingCardFlippingDeg = 180
    
                handsContainerElement = this.$el.querySelector('.hands-container');
                const rect = handsContainerElement.getBoundingClientRect();
                const destinationCardWidth = handsContainerElement.querySelector('.gameCard').offsetWidth
    
                this.drawingCard.currentX = rect.right - destinationCardWidth
                this.drawingCard.currentY = rect.top
                this.drawingCard.width = destinationCardWidth
            }else if(this.currentPlayer !== this.yourPlayer){
    
                landingContainerElemenet = this.$el.querySelector(`#player-${this.currentPlayer.name}`);
                const rect = landingContainerElemenet.getBoundingClientRect();
                const destinationCardWidth = landingContainerElemenet.offsetWidth
                const destinationCardHeight = landingContainerElemenet.offsetHeight
    
                this.drawingCard.currentX = rect.left + (destinationCardWidth /2)
                this.drawingCard.currentY = rect.top + (destinationCardHeight /2)
                this.drawingCard.width = 0
            }

            await this.sleep(this.animationSpeed)

            this.drawingCard.gettingDrawn = false
            this.drawingCard.updatedAt = Date.now()
            this.drawingCard.location = this.currentPlayer.name
            
        },
        getFixedPosition(element) {
            const rect = element.getBoundingClientRect();
            return {
                top: rect.top,
                left: rect.left
            };
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
            
            const verticalPosition = (Math.random() * 33 + 2);
            const horizontalPosition = (Math.random() * 38 + 2);
            
            tempCard.trashLocationX = horizontalPosition
            tempCard.trashLocationY = verticalPosition
            
            const maxDeg = 15;
            tempCard.rotation = 0


            tempCard.location = 'moving'
            this.movingCard.setUpBy = this.currentPlayer

            if(this.movingCard.setUpBy == this.yourPlayer){
                const cardElement = this.$el.querySelector(`#card-${tempCard.id}`)
                const startPos = this.getFixedPosition(cardElement);
    
                this.movingCard.currentX = startPos.left
                this.movingCard.currentY = startPos.top

                handsContainerElement = this.$el.querySelector('.hands-container');
                const destinationCardWidth = handsContainerElement.querySelector('.gameCard').offsetWidth
                this.movingCard.width = destinationCardWidth
            }else {
                this.movingCard.width = 0

                const playerContainer = this.$el.querySelector(`#player-${this.movingCard.setUpBy.name}`);
                const rect = playerContainer.getBoundingClientRect();
                const destinationCardWidth = playerContainer.offsetWidth
                const destinationCardHeight = playerContainer.offsetHeight

                this.movingCard.currentX = rect.left + (destinationCardWidth /2)
                this.movingCard.currentY = rect.top + (destinationCardHeight /2)
            }

            await this.sleep(250)

            landingContainerElemenet = this.$el.querySelector(`.trash-area`);
            const rect = landingContainerElemenet.getBoundingClientRect();
            const destinationCardWidth = landingContainerElemenet.offsetWidth
            const destinationCardHeight = landingContainerElemenet.offsetHeight

            this.movingCard.currentX = rect.left + (destinationCardWidth * (this.movingCard.trashLocationX / 100))
            this.movingCard.currentY = rect.top + (destinationCardHeight * (this.movingCard.trashLocationY / 100))
            this.movingCard.rotation = Math.round(Math.random() * maxDeg - (maxDeg / 2));
            this.movingCard.width = 100 * .7;
            this.movingCard.updatedAt = Date.now();

            await this.sleep(650)

            
            


            // -------------------------
            this.movingCard.usingCard = false
            this.movingCard.picked = false
            
            this.movingCard.location = 'trash'
            this.currentPlayer.hasMadeMove = true

            
            await this.sleep(this.aiSpeed)
            this.goToNextPlayer()


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
        getdrawingCardLocation(){
            return {
                position: 'fixed',
                ...this.parsePosition(this.drawingCardYCoordinate),
                ...this.parsePosition(this.drawingCardXCoordinate),
                width: this.drawingCardWidth + 'px',
                transform: 'rotate(' + this.drawingCardRotation + 'deg)',
                zIndex: 100,
                transition: `all ${this.animationSpeed / 1000 + .25}s`
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

        // =========================================
        async goToNextPlayer() {
            // Move to the next player, wrapping around if necessary
            this.currentPlayer.isRevealing = false
            this.currentPlayer.hasDrawn = false
            this.currentPlayer.hasMadeMove = false

            for(let card of this.deck){
                card.picked = false
                card.usingCard = false
                card.isMoving = false
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
                if(this.drawingCard) return false
                if(this.currentPlayer.isAI) return false

                if(this.currentPlayer.hasMadeMove) return true

                if(this.activeCard) return false


                if(this.pickedCard) return true
            }

            return false;
        },
        pickCard(card){
            if(this.currentPlayer !== this.yourPlayer) return
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
            card.isMoving = true

            const startPos = this.getFixedPosition(this.$el.querySelector(`#foot-trash-${card.name}`));
            this.drawingCardYCoordinate = `top: ${startPos.top}px`;
            this.drawingCardXCoordinate = `left: ${startPos.left}px`;
            this.drawingCardWidth = 50 -2;

            // ----------------

            // const finalWidth = 0
            // const finalHeight = finalWidth * 1.33
            
            this.drawingCardRotation = 0
            await this.sleep(100)

            const currentFinalCard = this.playerHands(this.currentPlayer.name)[this.playerHands(this.currentPlayer.name).length -2]
            
            const endPosElement = this.$el.querySelector(`#card-${currentFinalCard.id}`);
    
            const rect = endPosElement.getBoundingClientRect();
            this.drawingCardYCoordinate = `top: ${rect.top}px`;
            this.drawingCardXCoordinate = `left: ${rect.left}px`;

            this.drawingCardWidth = rect.width -2

            await this.sleep(this.animationSpeed + 250)

            card.isMoving = false
        },

        async interactBaby(baby,player,babyIndex){
            if(this.gameStatus !== 'distributed') return
            if(this.currentPlayer.name !== player.name) return

            

            if(this.activeCard?.type == 'food') {
                if(baby.isBlocked) return
                if(baby.foodArray.length >= 2) return

                this.activeCard.isMoving = true
                const startPos = this.getFixedPosition(this.$el.querySelector(`#card-${this.activeCard.id}`));
                this.drawingCardYCoordinate = `top: ${startPos.top}px`;
                this.drawingCardXCoordinate = `left: ${startPos.left}px`;
                this.drawingCardWidth = this.$el.querySelector(`#card-${this.activeCard.id}`).offsetWidth -2;

                // ----------------

                // const finalWidth = 0
                // const finalHeight = finalWidth * 1.33
                
                this.drawingCardRotation = 0
                await this.sleep(100)

                const endPosElement = this.$el.querySelector(`#${this.currentPlayer.name}-baby-${babyIndex}`);
        
                const rect = endPosElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                this.drawingCardYCoordinate = `top: ${centerY}px`;
                this.drawingCardXCoordinate = `left: ${centerX}px`;

                this.drawingCardWidth = 0

                await this.sleep(this.animationSpeed + 250)
                
                
                baby.foodArray.push(this.activeCard)
                this.currentPlayer.hasMadeMove = true
                
                this.activeCard.isMoving = false
                this.activeCard.usingCard = false
                this.pickedCard.pickCard = false
                this.pickedCard.location = null
                
            }


            if(this.activeCard?.type == 'able') {
                if(!baby.isBlocked) return 

                card = baby.isBlocked

                const startPos = this.getFixedPosition(this.$el.querySelector(`#card-${card.id}`));
                this.drawingCardYCoordinate = `top: ${startPos.top}px`;
                this.drawingCardXCoordinate = `left: ${startPos.left}px`;
                this.drawingCardWidth = this.$el.querySelector(`#card-${card.id}`).offsetWidth -2;
                this.drawingCardRotation = 0;
                const ogSpeed = this.animationSpeed
                this.animationSpeed = -250
                await this.sleep(500)

                card.isMoving = true

                await this.sleep(0)
                // this.animationSpeed = ogSpeed

                // await this.sleep(this.animationSpeed)


                const finalWidth = 50
                const finalHeight = finalWidth * 1.33

                // ----------



                const verticalPosition = (Math.random() * 45);
                const horizontalPosition = (Math.random() * 46);

                const vert = Math.random() < 0.05 ? 'top' : 'bottom'
                const horizon = Math.random() < 0.5 ? 'left' : 'right'
                
                card.verticalPosition = `${vert}: ${verticalPosition}%`;
                card.horizontalPosition = `${horizon}: ${horizontalPosition}%`;
                
                const maxDeg = 45;
                card.rotation = Math.round(Math.random() * maxDeg - (maxDeg / 2));
                // ----------------------
                this.drawingCardRotation = card.rotation

                const trashContainer = this.$el.querySelector('.trash-area');
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

                this.drawingCardXCoordinate = `left: ${tempXcordinate}px`;
                this.drawingCardYCoordinate = `top: ${tempYcordinate}px`;

                this.animationSpeed = ogSpeed
                await this.sleep(this.animationSpeed + 250)
                card.isMoving = false

                // ----------


                // await this.trashCard(card)
                card.location = 'trash'
                card.updatedAt = Date.now();

                baby.isBlocked = false
    
                // this.pickedCard.usingCard = false
                // this.pickedCard.pickCard = false

                await this.trashCard(this.pickedCard)
    
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
                this.activeCard.isMoving = true
                const startPos = this.getFixedPosition(this.$el.querySelector(`#card-${this.activeCard.id}`));
                this.drawingCardYCoordinate = `top: ${startPos.top}px`;
                this.drawingCardXCoordinate = `left: ${startPos.left}px`;
                this.drawingCardWidth = this.$el.querySelector(`#card-${this.activeCard.id}`).offsetWidth -2;
                this.drawingCardRotation = 0
    
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
                await this.sleep(this.animationSpeed)
            }



            let blockFlag = false
            let babyCount = 0
            let babyTarget
            for (let baby of this.chosenPlayer.babies) {
                if (!baby.isBlocked && baby.foodArray.length == 0) {
                    babyTarget = baby
                  blockFlag = true
                  break; // Exit the loop after finding the first unblocked baby
                }

                babyCount++
            }

            if(blockFlag) {
                

                const finalWidth = 50
                const finalHeight = finalWidth * 1.33
                
                this.drawingCardRotation = 0
                await this.sleep(100)

                const endPosElement = this.$el.querySelector(`#${this.chosenPlayer.name}-baby-${babyCount}`);
        
                const rect = endPosElement.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                this.drawingCardYCoordinate = `top: ${centerY - (finalHeight/2)}px`;
                this.drawingCardXCoordinate = `left: ${centerX - (finalWidth/2)}px`;

                this.drawingCardWidth = 50

                if(mode == 'fast'){
                    await this.sleep(100)
                }else{
                    await this.sleep(this.animationSpeed + 500)
                }
                
                babyTarget.isBlocked = this.activeCard;
                this.pickedCard.location = null
            }
            this.activeCard.isMoving = false
            
            this.activeCard.usingCard = false
            this.pickedCard.pickCard = false
            
            await this.sleep(this.animationSpeed)
            this.chosenPlayer = null

            this.currentPlayer.hasMadeMove = true
        },

        async aiMove(){
                
            await this.drawCard()

            let hasAutomated = false;
            
            console.log(this.playerHands(this.currentPlayer.name))

            await this.sleep(this.aiSpeed)

            // just for now
            // simple trash autoamtion
            if(!hasAutomated){
                this.playerHands(this.currentPlayer.name)[0].picked = true

                console.log(`trash Automation`)
                await this.trashCard()
                hasAutomated = true
                return;
           }

            // feeding Automation
            if(!hasAutomated){
                for(let card of this.playerHands(this.currentPlayer.name)){
                    if(card.type == 'food') {
                        if(this.food[this.currentPlayer.king.foodRequirements[0]].name == card.name || this.food[this.currentPlayer.king.foodRequirements[1]].name == card.name){
                            // await this.sleep(500)
                            let count = 0
                            for(let baby of this.currentPlayer.babies){
                                if(!baby.isBlocked && baby.foodArray?.length < 2 && !hasAutomated){
                                    card.picked = true
                                    await this.sleep(this.aiSpeed)
                                    this.useCard()
                                    await this.interactBaby(baby,this.currentPlayer,count)
                                    hasAutomated = true
    
                                    console.log(`feeding Automation`)
                                    break;
                                }
                                count++
                            }
                        }
    
    
                    }
                }
            }

            // eCard automation
            if(!hasAutomated){
                
                for(let card of this.playerHands(this.currentPlayer.name)){
                    if(card.type == 'energy') {
                        for(let trashCard of this.deck){
                            if(trashCard.location == 'trash' && trashCard.type == 'food' && (this.food[this.currentPlayer.king.foodRequirements[0]].name == trashCard.name || this.food[this.currentPlayer.king.foodRequirements[1]].name == trashCard.name)){

                                card.picked = true
                                this.useCard()
                                await this.retriveFood(trashCard)

                                let count = 0
                                for(let baby of this.currentPlayer.babies){
                                    if(!baby.isBlocked && baby.foodArray?.length < 2 && !hasAutomated){
                                        trashCard.picked = true
                                        await this.sleep(this.aiSpeed)
                                        this.useCard()
                                        await this.interactBaby(baby,this.currentPlayer,count)
                                        hasAutomated = true

                                        console.log(`ecard Automation`)
                                        break;
                                    }
                                    count++
                                }
                                
                                
                                break
                            }
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

                                hasAutomated = true

                                console.log(`able Automation`)
                                break;
                            }
                            count++
                        }


                    }
                }
            }

            // obstacle automation
            if(!hasAutomated){
                for(let card of this.playerHands(this.currentPlayer.name)){
                    if(card.type == 'obstacle') {
                        

                        card.picked = true;
                        await this.sleep(this.aiSpeed)
                        this.useCard()
    
                        await this.randomObstacle()
                        hasAutomated = true
                        if(card.location == this.currentPlayer.name) hasAutomated = false

                        console.log(`obstacle automation`)
                        break;
                    }
                }
            }

            // trash autoamtion
            if(!hasAutomated){
                 for(let card of this.playerHands(this.currentPlayer.name)){
                     if(card.type == 'food'){
                         card.picked = true
                         await this.sleep(this.aiSpeed)
                         await this.trashCard()
                         hasAutomated = true

                         console.log(`trash Automation`)
                         break
                     }
                 }

                 if(!hasAutomated){
                     this.playerHands(this.currentPlayer.name)[0].picked = true

                     console.log(`trash Automation`)
                     await this.trashCard()
                 }
            }

            
            await this.sleep(this.aiSpeed)
            await this.goToNextPlayer()
        },
        
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


        

        // if(this.developingMode){
        //     const ogSpeed = this.animationSpeed
        //     this.animationSpeed = 10
        //     for (let i = 0; i < 46; i++) {
            
        //         await this.aiMove()

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
                    <span v-if="card.type === 'food'">{{ card.type }}</span>
                    <span v-else>{{ card.name }}</span>
                </div>
            </div>
        </div>
    `
});         


app.mount('#app');