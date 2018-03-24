import React from 'react';

import './SideDrawer.scss';

export default class SideDrawer extends React.Component {

    state = {
        isVisible: false,
        isOpen: false,
        menuPosition: 0,
        menuRatio: 0,
    };

    touchId = null;

    rafCounter = 0;

    onTransitionEndHandler = () => {
        if (!this.state.isOpen) {
            this.setState({
                isVisible: false,
            });
        }
    }

    touchClientX = 0;

    rafHandler = () => {
        if (this.rafCounter == 0) {
            return;
        }
        this.setState({
            menuPosition: Math.min(this.drawerWidth, this.touchClientX),
            menuRatio: Math.min(this.drawerWidth, this.touchClientX) / this.drawerWidth,
        });
        if (this.rafCounter > 0) {
            this.rafCounter--;
            window.requestAnimationFrame(this.rafHandler);
        }
    }

    touchMoveHandler = event => {
        const touch = [...event.changedTouches].find(touch => touch.identifier === this.touchId);
        if (touch == null) {
            return;
        }
        this.touchClientX = touch.clientX | 0;
        if (this.rafCounter == 0) {
            this.rafCounter = 5;
            window.requestAnimationFrame(this.rafHandler);
        }
        this.rafCounter = 5;
        event.preventDefault();
    }

    touchEndHandler = event => {
        const touch = [...event.changedTouches].find(touch => touch.identifier === this.touchId);
        if (touch == null) {
            return;
        }
        this.touchId = null;
        this.rafCounter = 0;
        if (this.state.menuPosition < 100) {
            this.close();
        } else {
            this.openFull();
        }
        this.unsubscribeTouchEvents();
    }

    unsubscribeTouchEvents = () => {
        document.removeEventListener('touchmove', this.touchMoveHandler);
        document.removeEventListener('touchend', this.touchEndHandler);
    }

    touchStartHandler = event => {
        if (this.touchId != null || this.state.isOpen) {
            return;
        }
        const touch = event.changedTouches[0];
        if (touch.clientX > 30) {
            return;
        }
        this.touchId = touch.identifier;
        this.setState({
            isVisible: true,
            isOpen: true,
            menuPosition: touch.clientX,
        });
        document.addEventListener('touchmove', this.touchMoveHandler, {passive: false});
        document.addEventListener('touchend', this.touchEndHandler);
        event.preventDefault();
    }

    close = () => {
        this.setState({
            isOpen: false,
            menuPosition: 0,
            menuRatio: 0,
        });
    }

    openFull = () => {
        this.setState({
            menuPosition: this.drawerWidth,
            menuRatio: 1,
        });
    }

    componentWillMount() {
        document.addEventListener('touchstart', this.touchStartHandler, {passive: false});
    }

    componentWillUnmount() {
        this.unsubscribeTouchEvents();
        document.removeEventListener('touchstart', this.touchStartHandler);
    }

    grabDrawer = elem => {
        this.$drawer = elem;
        if (elem) {
            this.forceUpdate();
        }
    }

    get drawerWidth() {
        return this.$drawer ? this.$drawer.getBoundingClientRect().width : 0;
    }

    render() {
        return (
            <div className={`SideDrawer ${this.touchId != null ? 'SideDrawer--moving' : ''} ${this.state.isVisible ? '' : 'SideDrawer--hidden'} ${this.state.isOpen ? 'SideDrawer--open' : ''}`}>
                <div
                    className="SideDrawer--backdrop"
                    style={{
                        opacity: (this.state.menuRatio || 0) * 0.3,
                    }}
                    onClick={this.close}
                />
                <div
                    onTransitionEnd={this.onTransitionEndHandler}
                    className="SideDrawer--container"
                    ref={this.grabDrawer}
                    style={{
                        transform: `translateX(-100%) translateX(${this.state.menuPosition}px)`,
                    }}
                >
                    BEGIN
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales pretium erat eu condimentum. Etiam vel pretium augue. Vivamus sed arcu lectus. Donec non sapien at mauris malesuada tincidunt. Praesent ac semper ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec tincidunt porta justo a scelerisque. Mauris vitae felis sit amet nibh elementum vestibulum. Morbi tristique ullamcorper leo in finibus. Fusce ac blandit elit. Nullam consectetur eros nec risus mollis, at semper libero luctus. Quisque nec odio a urna blandit mattis.
                    </p>
                    <p>
                        Proin varius arcu eget sapien eleifend finibus. Nullam id scelerisque turpis. Fusce egestas faucibus quam et rutrum. Nunc lacinia sem sit amet elementum pellentesque. Mauris blandit hendrerit tempor. Morbi pharetra metus a congue pulvinar. Ut pretium porta sapien, a viverra dui ornare ut. Vivamus dapibus orci ut eros mattis pellentesque. Nunc pretium turpis et urna dictum pharetra. Donec ex eros, ullamcorper et mattis nec, fermentum et nunc. In ex mi, suscipit ut dui ac, pellentesque faucibus est. Morbi dolor tortor, pharetra pharetra lacus mattis, suscipit accumsan elit. Donec faucibus magna quis lacus gravida, nec sodales sapien viverra. Duis euismod, magna at maximus posuere, ligula libero pharetra ante, ut placerat mi nibh eget nisi. Cras fringilla dui tempor, vehicula ex sit amet, ullamcorper lectus.
                    </p>
                    <div>
                        <input type="text" />
                    </div>
                    <p>
                        Proin sed finibus tortor. Pellentesque nec odio erat. Nunc laoreet, tortor sollicitudin iaculis luctus, massa urna ultricies dolor, at faucibus nisi odio vitae nisi. Sed sapien nibh, hendrerit a convallis sit amet, fringilla in sapien. Nunc id suscipit mauris, fringilla fringilla nunc. Morbi nec dolor eget arcu imperdiet bibendum quis quis metus. Integer scelerisque et neque ut condimentum.
                    </p>
                    <p>
                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut pharetra orci ut venenatis eleifend. Nunc iaculis nisl justo, ut gravida lacus faucibus sit amet. Morbi maximus lorem sit amet finibus porttitor. Nullam interdum efficitur imperdiet. Etiam porttitor mi lectus, ut rutrum leo porttitor non. Aliquam erat volutpat. Nullam molestie velit orci. Donec malesuada orci eget risus facilisis finibus. In ultricies odio sit amet urna tempus mattis. Donec tempor lorem id purus viverra, vitae luctus sem placerat. Praesent hendrerit velit sed iaculis mollis. Morbi ornare nec augue eu ullamcorper. Integer suscipit ex nisi, in facilisis libero pulvinar eu. Nulla massa lectus, pretium nec risus vitae, viverra facilisis diam.
                    </p>
                    <p>
                        In id libero dui. Integer sit amet augue metus. Vestibulum efficitur vel dui et scelerisque. Integer augue erat, venenatis id vehicula id, blandit sed velit. Fusce scelerisque placerat egestas. Vivamus posuere magna est, et aliquet ligula commodo vitae. Donec pharetra lectus est, ullamcorper feugiat ante scelerisque vitae. Donec tempor felis sed sapien semper dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ut cursus neque.
                    </p>
                    END
                </div>
            </div>
        );
    }
}
