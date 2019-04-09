class Carousel {
    /**
     * @param {HTMLElement} element
     * @param {Object} options
     * @param {Object} options.slidesToScroll Nombre d'éléments à faire défiler
     * @param {Object} options.slidesVisible Nombre d'éléments visible dans un slide
     * @param {Boolean} options.loop Indique si le carousel doit boucler
     */

    constructor (element, options ={}) {
        this.element = element;
        this.options = Object.assign({}, {
            slidesToScroll: 3,
            slidesVisible: 3,
        }, options);
        let children = [].slice.call(element.children);
        this.isMobile = true;
        this.currentItem = 0;
        this.moveCallbacks = [];
        this.root = this.createDivWithClass('carousel');
        this.container = this.createDivWithClass('carousel__container');
        this.root.appendChild(this.container);
        this.element.appendChild(this.root);
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel__item');
            item.appendChild(child);
            this.container.appendChild(item);
            return item
        });
        this.setStyle();
        this.createNavigation();
        this.timer();
        this.keyPrev();
        this.keyNext();
        };

    /**
    * Applique les bonnes dimensions aux éléments du carousel
    */
    setStyle (){
        let ratio = this.items.length / this.options.slidesVisible;
        this.container.style.width = (ratio * 100) + "%";
        this.items.forEach(item => item.style.width = ((100 / this.options.slidesVisible) / ratio) + "%")
    }

    createNavigation () {
        let nextButton = this.createDivWithClass('carousel__next');
        let nextButton2 = this.createDivWithClass('carousel__next2')
        let prevButton = this.createDivWithClass('carousel__prev');
        let pauseButton = this.createDivWithClass('carousel__pause');
        let playButton = this.createDivWithClass('carousel__play');
        this.root.appendChild(nextButton);
        this.root.appendChild(nextButton2);
        this.root.appendChild(prevButton);
        this.root.appendChild(pauseButton);
        this.root.appendChild(playButton);
        nextButton.addEventListener('click', this.next.bind(this));
        nextButton2.addEventListener('click', this.next2.bind(this));
        prevButton.addEventListener('click', this.prev.bind(this));
        pauseButton.addEventListener('click', this.pause.bind(this));
        playButton.addEventListener('click', this.play.bind(this));
    }
    next() {
        this.gotoItem(this.currentItem + this.options.slidesToScroll);
        if(this.options.slidesToScroll === 0){
            this.gotoItem(this.currentItem + this.options.slidesToScroll + 1)
        }
    }
    next2() {
        this.gotoItem(this.currentItem + this.options.slidesToScroll)
    }
    prev () {
        this.gotoItem(this.currentItem - this.options.slidesToScroll);
        if(this.options.slidesToScroll === 0){
            this.gotoItem(this.currentItem + this.options.slidesToScroll - 1)
        }
    }
    timer() {
        setInterval(() => {
            window.addEventListener('load', this.next2())
        }, 5000);
    }
    keyPrev() {
        window.addEventListener("keydown", event => {
            if(event.keyCode === 37){
                this.prev()
            }
        })
    }
    keyNext() {
        window.addEventListener("keydown", event => {
            if(event.keyCode === 39){
                this.next()
            }
        })
    }
    pause() {
        this.options.slidesToScroll = 0;
        this.options.slidesVisible = 1;

    }
    play() {
        this.options.slidesToScroll = 1;
        this.options.slidesVisible = 1;
    }
    /**
    *Déplace le slider vers l'élément ciblé
    *@param {number} index
    */
    gotoItem (index) {
        if (index < 0) {
            index = this.items.length - this.options.slidesVisible
        } else if (index >= this.items.length || this.items[this.currentItem + this.options.slidesVisible] === undefined) {
            index = 0
        }
        let translateX = index * -100 / this.items.length;
        this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)';
        this.currentItem = index
    }

    createDivWithClass (className) {
    let div = document.createElement('div');
    div.setAttribute('class', className);
    return div
    }
}
document.addEventListener("DOMContentLoaded", function () {
    
    new Carousel(document.querySelector("#carousel1"), {
        slidesVisible: 1,
        slidesToScroll: 1
    })
    
});


