import { Footer } from "../_components/navigation/footer";
import Navbar from "../_components/navigation/navbar";
import { SearchBox } from "../_components/search/search-box";

export default function SearchPage() {
  return (
    <div>
      <Navbar />
      <Footer />
      <div className=" max-w-2xl mx-auto my-2 flex flex-col items-start">
        <SearchBox />
      </div>
    </div>
  );
}
