import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import SideDrawer from './SideDrawer';

export default class App extends React.Component {

    keys = [];
    currentKey = null;

    componentDidMount() {
        this.keys.push(this.history.location.key);
        this.unlisten = this.history.listen((state, action) => {
            if (action === 'PUSH') {
                this.$transition.className = '';
                this.keys.push(state.key);
            } else if (action === 'POP') {
                const fromIndex = this.keys.indexOf(this.currentKey);
                const toIndex = this.keys.indexOf(state.key);
                if (fromIndex === -1) {
                    console.log('unknown from state');
                    location.reload();
                }
                if (toIndex === -1) {
                    console.log('unknown to state');
                    location.reload();
                }
                const isBackward = fromIndex > toIndex;
                if (isBackward) {
                    this.$transition.className = 'prev';
                    const $node = this.$transition.querySelector('.route-animation-enter')
                    $node.setAttribute('style', 'transform: translateX(-100%); transition-property: none');
                    setTimeout(() => $node.removeAttribute('style'));
                } else {
                    this.$transition.className = '';
                    const $node = this.$transition.querySelector('.route-animation-enter')
                    $node.setAttribute('style', 'transform: translateX(100%); transition-property: none');
                    setTimeout(() => $node.removeAttribute('style'));
                }
            }
            this.currentKey = this.history.location.key;
        })
    }

    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten();
        }
    }

    grabTransition = elem => {
        this.$transition = ReactDOM.findDOMNode(elem);
    }

    render() {
        return (
            <div className="root">
                <AppHeader />
                <Route render={({location, history}) => (
                    this.history = history,
                    <TransitionGroup ref={this.grabTransition}>
                        <CSSTransition key={location.pathname} timeout={300} classNames="route-animation">
                            <Switch location={location}>
                                <Route strict exact path="/" component={HomePage} />
                                <Route strict exact path="/list" component={ListPage} />
                                <Route strict exact path="/profile" component={ProfilePage} />
                                <Route render={() => (
                                    <div>not found</div>
                                )} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )} />
                <AppFooter />
                <SideDrawer />
            </div>
        );
    }
}

class HomePage extends React.Component {

    state = {
        isDrawerOpen: false,
        viewMore: false,
    };

    toggleViewMore = () => {
        this.setState(state => ({
            viewMore: !state.viewMore,
        }));
    }

    render() {
        return (
            <div className="content">
                <h2>Home</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales pretium erat eu condimentum. Etiam vel pretium augue. Vivamus sed arcu lectus. Donec non sapien at mauris malesuada tincidunt. Praesent ac semper ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec tincidunt porta justo a scelerisque. Mauris vitae felis sit amet nibh elementum vestibulum. Morbi tristique ullamcorper leo in finibus. Fusce ac blandit elit. Nullam consectetur eros nec risus mollis, at semper libero luctus. Quisque nec odio a urna blandit mattis.
                </p>
                <div>
                    <button onClick={this.toggleViewMore}>View more</button>
                </div>
                { this.state.viewMore ? (
                    <div>
                        <p>
                            Proin varius arcu eget sapien eleifend finibus. Nullam id scelerisque turpis. Fusce egestas faucibus quam et rutrum. Nunc lacinia sem sit amet elementum pellentesque. Mauris blandit hendrerit tempor. Morbi pharetra metus a congue pulvinar. Ut pretium porta sapien, a viverra dui ornare ut. Vivamus dapibus orci ut eros mattis pellentesque. Nunc pretium turpis et urna dictum pharetra. Donec ex eros, ullamcorper et mattis nec, fermentum et nunc. In ex mi, suscipit ut dui ac, pellentesque faucibus est. Morbi dolor tortor, pharetra pharetra lacus mattis, suscipit accumsan elit. Donec faucibus magna quis lacus gravida, nec sodales sapien viverra. Duis euismod, magna at maximus posuere, ligula libero pharetra ante, ut placerat mi nibh eget nisi. Cras fringilla dui tempor, vehicula ex sit amet, ullamcorper lectus.
                        </p>
                        <p>
                            Proin sed finibus tortor. Pellentesque nec odio erat. Nunc laoreet, tortor sollicitudin iaculis luctus, massa urna ultricies dolor, at faucibus nisi odio vitae nisi. Sed sapien nibh, hendrerit a convallis sit amet, fringilla in sapien. Nunc id suscipit mauris, fringilla fringilla nunc. Morbi nec dolor eget arcu imperdiet bibendum quis quis metus. Integer scelerisque et neque ut condimentum.
                        </p>
                        <p>
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut pharetra orci ut venenatis eleifend. Nunc iaculis nisl justo, ut gravida lacus faucibus sit amet. Morbi maximus lorem sit amet finibus porttitor. Nullam interdum efficitur imperdiet. Etiam porttitor mi lectus, ut rutrum leo porttitor non. Aliquam erat volutpat. Nullam molestie velit orci. Donec malesuada orci eget risus facilisis finibus. In ultricies odio sit amet urna tempus mattis. Donec tempor lorem id purus viverra, vitae luctus sem placerat. Praesent hendrerit velit sed iaculis mollis. Morbi ornare nec augue eu ullamcorper. Integer suscipit ex nisi, in facilisis libero pulvinar eu. Nulla massa lectus, pretium nec risus vitae, viverra facilisis diam.
                        </p>
                        <p>
                            In id libero dui. Integer sit amet augue metus. Vestibulum efficitur vel dui et scelerisque. Integer augue erat, venenatis id vehicula id, blandit sed velit. Fusce scelerisque placerat egestas. Vivamus posuere magna est, et aliquet ligula commodo vitae. Donec pharetra lectus est, ullamcorper feugiat ante scelerisque vitae. Donec tempor felis sed sapien semper dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ut cursus neque.
                        </p>
                    </div>
                ) : null }
                END
            </div>
        );
    }
}

class ListPage extends React.Component {

    state = {
        isDrawerOpen: false,
        viewMore: false,
    };

    toggleViewMore = () => {
        this.setState(state => ({
            viewMore: !state.viewMore,
        }));
    }

    render() {
        return (
            <div className="content">
                <h2>List</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales pretium erat eu condimentum. Etiam vel pretium augue. Vivamus sed arcu lectus. Donec non sapien at mauris malesuada tincidunt. Praesent ac semper ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec tincidunt porta justo a scelerisque. Mauris vitae felis sit amet nibh elementum vestibulum. Morbi tristique ullamcorper leo in finibus. Fusce ac blandit elit. Nullam consectetur eros nec risus mollis, at semper libero luctus. Quisque nec odio a urna blandit mattis.
                </p>
                <div>
                    <button onClick={this.toggleViewMore}>View more</button>
                </div>
                { this.state.viewMore ? (
                    <div>
                        <p>
                            Proin varius arcu eget sapien eleifend finibus. Nullam id scelerisque turpis. Fusce egestas faucibus quam et rutrum. Nunc lacinia sem sit amet elementum pellentesque. Mauris blandit hendrerit tempor. Morbi pharetra metus a congue pulvinar. Ut pretium porta sapien, a viverra dui ornare ut. Vivamus dapibus orci ut eros mattis pellentesque. Nunc pretium turpis et urna dictum pharetra. Donec ex eros, ullamcorper et mattis nec, fermentum et nunc. In ex mi, suscipit ut dui ac, pellentesque faucibus est. Morbi dolor tortor, pharetra pharetra lacus mattis, suscipit accumsan elit. Donec faucibus magna quis lacus gravida, nec sodales sapien viverra. Duis euismod, magna at maximus posuere, ligula libero pharetra ante, ut placerat mi nibh eget nisi. Cras fringilla dui tempor, vehicula ex sit amet, ullamcorper lectus.
                        </p>
                        <p>
                            Proin sed finibus tortor. Pellentesque nec odio erat. Nunc laoreet, tortor sollicitudin iaculis luctus, massa urna ultricies dolor, at faucibus nisi odio vitae nisi. Sed sapien nibh, hendrerit a convallis sit amet, fringilla in sapien. Nunc id suscipit mauris, fringilla fringilla nunc. Morbi nec dolor eget arcu imperdiet bibendum quis quis metus. Integer scelerisque et neque ut condimentum.
                        </p>
                        <p>
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut pharetra orci ut venenatis eleifend. Nunc iaculis nisl justo, ut gravida lacus faucibus sit amet. Morbi maximus lorem sit amet finibus porttitor. Nullam interdum efficitur imperdiet. Etiam porttitor mi lectus, ut rutrum leo porttitor non. Aliquam erat volutpat. Nullam molestie velit orci. Donec malesuada orci eget risus facilisis finibus. In ultricies odio sit amet urna tempus mattis. Donec tempor lorem id purus viverra, vitae luctus sem placerat. Praesent hendrerit velit sed iaculis mollis. Morbi ornare nec augue eu ullamcorper. Integer suscipit ex nisi, in facilisis libero pulvinar eu. Nulla massa lectus, pretium nec risus vitae, viverra facilisis diam.
                        </p>
                        <p>
                            In id libero dui. Integer sit amet augue metus. Vestibulum efficitur vel dui et scelerisque. Integer augue erat, venenatis id vehicula id, blandit sed velit. Fusce scelerisque placerat egestas. Vivamus posuere magna est, et aliquet ligula commodo vitae. Donec pharetra lectus est, ullamcorper feugiat ante scelerisque vitae. Donec tempor felis sed sapien semper dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ut cursus neque.
                        </p>
                    </div>
                ) : null }
                END
            </div>
        );
    }
}

class ProfilePage extends React.Component {

    state = {
        isDrawerOpen: false,
        viewMore: false,
    };

    toggleViewMore = () => {
        this.setState(state => ({
            viewMore: !state.viewMore,
        }));
    }

    render() {
        return (
            <div className="content">
                <h2>Profile</h2>
                <p>
                    Proin eleifend condimentum nisl non mollis. Cras lacinia ante non nibh pharetra, in vehicula arcu varius. Nullam pulvinar dapibus suscipit. Mauris ultrices nibh elit, at sagittis est pulvinar ac. Maecenas ligula libero, rhoncus at purus eu, sollicitudin efficitur lectus. Pellentesque nec sem fringilla, mattis purus vel, condimentum orci. Ut lobortis tristique turpis id vestibulum. Ut malesuada tincidunt dolor, nec ultrices nibh rutrum vel. Maecenas cursus lectus tellus, id fermentum velit lacinia eget. Sed accumsan leo id massa commodo rutrum. Vivamus venenatis, erat a congue auctor, nisi elit facilisis sapien, sed tincidunt massa dui dictum metus.
                </p>
                <div>
                    <button onClick={this.toggleViewMore}>View more</button>
                </div>
                { this.state.viewMore ? (
                    <div>
                        <p>
                            Nam eu felis id sem molestie tincidunt ac a mauris. Suspendisse potenti. Nam vitae nibh quam. Integer ultricies tempus felis, sit amet rutrum mauris viverra eu. Integer sed sem a magna interdum porta. Etiam pretium turpis at nunc gravida consectetur. Ut vel justo ullamcorper, porttitor eros sit amet, consequat enim. Nullam pulvinar mauris eu eros maximus convallis. Phasellus maximus nibh non sem sagittis feugiat. Pellentesque hendrerit, odio vel efficitur sollicitudin, nibh quam imperdiet libero, in maximus sapien nunc sit amet lacus.
                        </p>
                        <p>
                            Maecenas faucibus dui vel facilisis rhoncus. Vivamus nec justo sagittis, tempor enim non, viverra metus. Etiam in ultricies urna. Cras lacinia imperdiet orci, eu luctus diam aliquet vitae. Mauris porttitor cursus dui, at placerat justo maximus quis. Vivamus molestie rutrum magna, iaculis malesuada ipsum fringilla sit amet. Quisque id ante finibus lorem ultrices tristique. Sed tincidunt dapibus facilisis. Nam rutrum turpis non purus venenatis efficitur. Praesent elementum fermentum erat. Ut feugiat lectus ac nulla volutpat volutpat. Nulla a volutpat elit.
                        </p>
                        <p>
                            Proin eleifend condimentum nisl non mollis. Cras lacinia ante non nibh pharetra, in vehicula arcu varius. Nullam pulvinar dapibus suscipit. Mauris ultrices nibh elit, at sagittis est pulvinar ac. Maecenas ligula libero, rhoncus at purus eu, sollicitudin efficitur lectus. Pellentesque nec sem fringilla, mattis purus vel, condimentum orci. Ut lobortis tristique turpis id vestibulum. Ut malesuada tincidunt dolor, nec ultrices nibh rutrum vel. Maecenas cursus lectus tellus, id fermentum velit lacinia eget. Sed accumsan leo id massa commodo rutrum. Vivamus venenatis, erat a congue auctor, nisi elit facilisis sapien, sed tincidunt massa dui dictum metus.
                        </p>
                        <p>
                            Praesent hendrerit lorem lorem, non sollicitudin tortor consectetur ac. Mauris fermentum consequat mi a cursus. Etiam aliquet tincidunt libero id volutpat. Nunc ut eros at risus laoreet sodales. Nullam consequat risus ac iaculis tempus. Aenean fringilla nisl in tristique ultricies. Aliquam erat volutpat. Ut facilisis orci ut ex sodales, a rutrum lacus tempor. Ut imperdiet eleifend libero, in commodo felis dapibus id. Maecenas viverra metus dolor, a vestibulum tellus vestibulum sit amet. Vivamus consectetur sit amet urna eu consequat. Quisque quis orci vel massa tempus ultrices.
                        </p>
                    </div>
                ) : null }
                END
            </div>
        );
    }
}

