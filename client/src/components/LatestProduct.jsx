import { newRequest } from "../utils/newRequest";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Card from "./Card";

const LatestProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await newRequest.get(`/products?isLatest=true`);
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  return (
    <div id="menu" className="pt-[100px] dark:bg-black/80 dark:text-white">
      <h1 className="w-full py-10 text-3xl font-semibold text-center">
        Latest Product
      </h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1536: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide
            key={product._id}
            className="dark:bg-black/80 dark:text-white p-5"
          >
            <Card key={product._id} product={product} isLatest />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestProduct;
