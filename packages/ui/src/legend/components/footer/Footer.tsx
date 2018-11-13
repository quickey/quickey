import { h } from "preact";

export interface IFooterProps {

}

export default function Footer(props: IFooterProps) {
    return (
        <footer className="quickey-footer">
            <div>Powered by ⚡️ <a href="https://github.com/quickey/quickey" rel="nofollow" target="_blank">Quickey</a></div>
        </footer>
    );
}