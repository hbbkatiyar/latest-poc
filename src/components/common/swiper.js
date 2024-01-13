import { Swiper, SwiperSlide } from "swiper/react";
import withStyles from "@material-ui/core/styles/withStyles";
import { useStyles } from "./swiperStyles";

// Import Swiper styles
import "swiper/swiper.scss";

function CustomSlider(props) {
  const { classes } = props;
  const { main } = classes;
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onNavigationShow={true}
      // onSlideChange={() => console.log('slide change')}
      // onSwiper={(swiper) => console.log(swiper)}
      className={main}
    >
      {props?.data?.map((item, index) => {
        return <SwiperSlide key={index}>{item}</SwiperSlide>;
      })}
    </Swiper>
  );
}
export default withStyles(useStyles, { withTheme: true })(CustomSlider);
