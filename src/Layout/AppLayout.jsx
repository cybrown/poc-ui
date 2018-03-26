import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './AppLayout.scss';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import SideDrawer from './SideDrawer';
import HomePage from '../Pages/HomePage';
import ListPage from '../Pages/ListPage';
import ProfilePage from '../Pages/ProfilePage';

export default class AppLayout extends React.Component {

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
                    this.$transition.className = 'AppLayout--navigation-previous';
                    const $node = this.$transition.querySelector('.AppLayout--content-animated-enter')
                    $node.setAttribute('style', 'transform: translateX(-100%); transition-property: none');
                    setTimeout(() => $node.removeAttribute('style'));
                } else {
                    this.$transition.className = '';
                    const $node = this.$transition.querySelector('.AppLayout--content-animated-enter')
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
            <div className="AppLayout">
                <AppHeader />
                <Route render={({location, history}) => (
                    this.history = history,
                    <TransitionGroup ref={this.grabTransition}>
                        <CSSTransition key={location.pathname} timeout={300} classNames="AppLayout--content-animated">
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
