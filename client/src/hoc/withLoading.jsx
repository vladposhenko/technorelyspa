import {useSelector} from "react-redux";
import {Spinner} from "react-bootstrap";

export function withLoading(Component) {
    return function (props) {
        const isLoading = useSelector(state => state.auth.isLoading)
        if(isLoading) return <Spinner/>
        return (
            <Component/>
        )
    }
}