import {observable} from 'mobx';
// import trackBg from '../assets/images/1.jpg';

class Track {
    @observable title = "Demo";
    @observable artist = "David Chavez";
    // @observable artwork = "https://images.unsplash.com/photo-1456425712190-0dd8c2b00156?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=360d6e0f5e2e816de5be2296703326f2&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb";
}

export default new Track();
