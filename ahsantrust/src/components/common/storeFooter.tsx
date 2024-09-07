import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { getStoreById, getStoreData } from "services/AxiosClient";
import { Store } from "type";

export function StoreFooter() {
  const [stores, setStores] = useState<Store | null>(null);
  const [storeCard, setStoreCard] = useState<Store[]>([]);
  const { id } = useParams<{ id: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getStoreById(id!);
        setStores(data);
        console.log("data card", data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, [id]);

  const handleCardClick = (id: string) => {
    navigate(`/stores/${id}`);
  };

  const slideLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, storeCard.length - 6) : prevIndex - 1
    );
  };

  const slideRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= storeCard.length - 6 ? 0 : prevIndex + 1
    );
  };

  const visibleStores = storeCard.slice(currentIndex, currentIndex + 6);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getStoreData();
        setStoreCard(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
    fetchStores();
  }, []);

  return (
    <div className="flex gap-3 justify-center">
      <button onClick={slideLeft} className="py-3 px-5 rounded-3xl	">
        <FaChevronLeft />
      </button>
      <div className="card-container flex gap-2 ">
        {visibleStores.map((stores) => (
          <div className="card" key={stores.id}>
            <div
              key={stores.id}
              className="card cursor-pointer bg-blue-50 p-3 rounded-md"
              onClick={() => handleCardClick(stores.id)}
            >
              <span className="flex gap-5">
                <img
                  src={stores.images_url}
                  alt={stores.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={slideRight} className="py-3 px-5 rounded-3xl">
        <FaChevronRight />
      </button>
    </div>
  );
}
