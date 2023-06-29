import css from "./Loader.module.css";

export const Loader = ()=> {
    return (
        <div className={css["loading"]}>
          <div className={css["i"]}></div>
          <div className={css["a"]}></div>
          <div className={css["u"]}></div>
        </div>
    );
  }

export default Loader;