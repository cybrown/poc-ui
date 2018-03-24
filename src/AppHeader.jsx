import * as React from 'react';

import './AppHeader.scss';

export default class AppHeader extends React.Component {

    $content = null;
    $scrollHidden = null;
    oldScrollY = 0;
    state = {
        scrollTitle: 0,
        activeIndex: 0,
    };
    scaleFactor = 4;

    scrollEventListener = (event) => {
        this.setState(state => ({
            scrollTitle: window.scrollY <= 0 ? 0 : Math.max(0, Math.min(this.scrollHiddenHeight * this.scaleFactor, state.scrollTitle + (window.scrollY - this.oldScrollY))),
        }));
        this.oldScrollY = window.scrollY;
    }

    componentDidMount() {
        document.addEventListener('scroll', this.scrollEventListener);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scrollEventListener);
    }

    grabContent = element => {
        this.$content = element;
        this.forceUpdate();
    }

    grabScrollHidden = element => {
        this.$scrollHidden = element;
        this.forceUpdate();
    }

    get contentHeight() {
        return this.$content ? this.$content.getBoundingClientRect().height : 0;
    }

    get scrollHiddenHeight() {
        return this.$scrollHidden ? this.$scrollHidden.getBoundingClientRect().height : 0;
    }

    render() {
        const {
            scrollTitle
        } = this.state;
        const scale = scrollTitle / (this.contentHeight || 1) / this.scaleFactor;
        return (
            <div className="AppHeader" style={{height: this.contentHeight}}>
                <div
                    ref={this.grabContent}
                    className="AppHeader--content"
                    style={{
                        transform: `translateY(-${scrollTitle / this.scaleFactor}px)`,
                    }}
                >
                    <div
                        ref={this.grabScrollHidden}
                        className="AppHeader--scroll-hidden"
                    >
                        <h1
                            className="AppHeader--title"
                            style={{
                                transformOrigin: 'bottom',
                                opacity: 1 - scale * 2,
                                transform: `scale(${1 - scale})`,
                            }}
                        >
                            App title
                        </h1>
                    </div>
                    <div className="AppHeader--nav">
                        <div className={this.state.activeIndex == 0 ? 'active' : ''} onClick={() => this.setState({activeIndex: 0})}>
                            <i className="fa fa-home" />
                            <div>Home</div>
                        </div>
                        <div className={this.state.activeIndex == 1 ? 'active' : ''} onClick={() => this.setState({activeIndex: 1})}>
                            <i className="fa fa-list" />
                            <div>List</div>
                        </div>
                        <div className={this.state.activeIndex == 2 ? 'active' : ''} onClick={() => this.setState({activeIndex: 2})}>
                            <i className="fa fa-user-circle" />
                            <div>Profile</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
