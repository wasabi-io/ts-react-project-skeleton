import * as shallowCompare from "react-addons-shallow-compare";

let compare: any = shallowCompare;
if(compare.default) {
    compare = compare.default;
}
export default compare;
