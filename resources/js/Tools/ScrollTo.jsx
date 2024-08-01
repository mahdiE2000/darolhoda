const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

export default scrollTo;
