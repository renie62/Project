import React from "react";

const About = () => {
  return (
    <div
      id="about"
      className="flex justify-center pt-[100px] dark:bg-black/80 dark:text-white"
    >
      <div className="w-[1400px] h-full flex md:flex-row flex-col md:justify-between gap-20 md:p-5 p-2">
        <div className="md:w-1/2 w-full flex flex-col md:items-start items-center gap-5">
          <h3 className="flex items-center text-xl font-medium text-green-700 dark:text-white/80">
            Why Choose Us
          </h3>
          <h1 className="text-3xl font-bold text-gray-700 dark:text-white">
            What Makes Our Product Delicious Ambrosial
          </h1>
          <p className="text-gray-600 dark:text-white/70 text-justify">
            We use only high-quality ingredients to ensure that every cup of
            bubble tea is delicious and refreshing. Our teas are brewed with
            premium loose-leaf tea leaves, and our tapioca balls are cooked to
            perfection for a perfect chewy texture.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            cum praesentium sint voluptatem corrupti beatae quisquam facilis
            dolorum autem dolore illum debitis natus, laborum aspernatur, rem
            blanditiis adipisci reiciendis velit.
          </p>
          <div className="w-full">
            <div className="flex sm:flex-row flex-col justify-between w-full gap-5 my-5">
              <div className="w-full border rounded-md shadow-lg flex items-center gap-2 p-3">
                <img className="h-10 w-10" src="/img/quality.png" alt="" />
                <h3 className=" text-lg font-semibold">Quality ingredients</h3>
              </div>
              <div className="w-full border rounded-md shadow-lg flex items-center gap-2 p-3">
                <img className="h-10 w-10" src="/img/variety.png" alt="" />
                <h3 className=" text-lg font-semibold">
                  Wide variety of flavors
                </h3>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col justify-between w-full gap-5">
              <div className="w-full border rounded-md shadow-lg flex items-center gap-2 p-3">
                <img className="h-10 w-10" src="/img/customizable.png" alt="" />
                <h3 className=" text-lg font-semibold">Customizable drinks</h3>
              </div>
              <div className="w-full border rounded-md shadow-lg flex items-center gap-2 p-3">
                <img className="h-10 w-10" src="/img/fast.png" alt="" />
                <h3 className=" text-lg font-semibold">
                  Fast and friendly service
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full order-first flex flex-col items-center">
          <img
            className="md:w-[350px] md:h-[350px] sm:w-[300px] sm:h-[300px]  lg:w-[500px] lg:h-[500px] object-cover hover:scale-110 duration-200 transition-all"
            src="/img/about.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
