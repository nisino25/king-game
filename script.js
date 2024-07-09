
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
                {name:'エネルギー1',imgSrc: './assets/image/energy-1.jpg'},
                {name:'エネルギー2',imgSrc: './assets/image/energy-2.jpg'},
            ],

            obstacle:[
                {name:'障害1',imgSrc: './assets/image/obstacle-1.jpg'},
                {name:'障害2',imgSrc: './assets/image/obstacle-2.jpg'},
                {name:'障害3',imgSrc: './assets/image/obstacle-3.jpg'},
                {name:'障害4',imgSrc: './assets/image/obstacle-4.jpg'},
            ],

            deck:[],

            maxDarkness: 0.5,

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
            return playerName => this.deck.filter(card => card.location === playerName);
        },

        pickedCard() {
            return this.deck.find(card => card.picked) || null;
        },
        activeCard(){
            if(!this.pickedCard?.usingCard) return null

            return this.pickedCard
        }
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
            handler(newVal) {
                newVal.forEach(player => {
                const allBabiesFed = player.babies.every(baby => baby.foodArray.length === 2);
                if (allBabiesFed) {
                    alert(`Game over for ${player.name}!`);
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
                    nameIndexContainer: createNameIndexContainer([4, 4, 4, 4, ])
                }
            ];

            const dataMap = {
                food: this.food,
                energy: this.energy,
                obstacle: this.obstacle
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
                        await this.sleep(20); // Add delay if needed
                    }
                }
            }

            this.gameStatus = 'distributed'
        },

        drawCard(){
            if(this.gameStatus !== 'distributed' || this.drawPile.length == 0) return
            
            if(!this.playerHands(this.playerHands(this.currentPlayer.name[0])))return

            if(this.currentPlayer.hasDrawn) return console.log('cant draw  anymore ') 

            
            this.drawPile[0].location = this.currentPlayer.name
            this.currentPlayer.hasDrawn = true
            this.currentPlayer.isRevealing = true
            
            
        },
        trashCard(){
            if(!this.pickedCard) return

            this.pickedCard.location = 'trash'
            this.pickedCard.updatedAt = Date.now();

            
            const verticalPosition = (Math.random() * 45);
            const horizontalPosition = (Math.random() * 46);
            
            this.pickedCard.verticalPosition = Math.random() < 0.5 ? `top: ${verticalPosition}%` : `bottom: ${verticalPosition}%`;
            this.pickedCard.horizontalPosition = Math.random() < 0.5 ? `left: ${horizontalPosition}%` : `right: ${horizontalPosition}%`;
            
            const maxDeg = 45;
            this.pickedCard.rotation = Math.round(Math.random() * maxDeg - (maxDeg / 2));
            

            this.pickedCard.picked = false
            this.currentPlayer.hasMadeMove = true


        },
        async goToNextPlayer() {
            // Move to the next player, wrapping around if necessary
            this.currentPlayer.isRevealing = false
            this.currentPlayer.hasDrawn = false
            this.currentPlayer.hasMadeMove = false

            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

            // if(this.developingMode){
            //     this.currentPlayer.isRevealing = true
            //     await this.sleep(750)
            //     this.drawCard()
            // }
        },
        feedBaby(baby,player){
            if(this.gameStatus !== 'distributed') return
            if(this.currentPlayer.name !== player.name) return
            if(baby.foodArray.length == 2) return
            

            baby.foodArray.push(this.food[0])
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
                topPosition = -25
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
            // const darkness = (index + 1) / this.otherTrashPile.length * this.maxDarkness;
            // return `
            //     transform: rotate(${card?.rotation}deg); 
            //     ${card.verticalPosition};
            //     ${card.horizontalPosition};
            //     backgroundColor: rgba(0, 0, 0, ${darkness});`;
        },

        buttonCheck(action) {

            if (action === 'trash') {
                return this.pickedCard && !this.currentPlayer.hasMadeMove;
            }

            if (action === 'use') {
                return this.pickedCard && !this.currentPlayer.hasMadeMove && this.pickedCard.type == 'energy';
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
        },
        unPickAllCards(){
            for(let i in this.deck){
                let card = this.deck[i]
                card.picked = false
                card.usingCard = false 
            }
        },
        
    },
    async mounted(){

        if(this.developingMode){
            for (let i = 0; i < this.defaultNumber; i++) {
                this.addPlayer();
            }

            await this.goToGamePage()
        }

        

        if(this.developingMode){
            for (let i = 0; i < 20; i++) {
                this.drawCard()
                this.playerHands(this.currentPlayer.name)[0].picked = true
                this.trashCard()
                this.goToNextPlayer()
                await this.sleep(25)
            }
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
            
                default :
                    color = 'black';
                    break;
            }

            return { backgroundColor: color };

        },
    },
    template: `
        <div class="gameCard">
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