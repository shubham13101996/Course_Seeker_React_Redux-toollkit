import { ThreeDots } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="loader">
      <ThreeDots
        height="120"
        width="140"
        radius="9"
        color="#9ab4e7"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  );
};
