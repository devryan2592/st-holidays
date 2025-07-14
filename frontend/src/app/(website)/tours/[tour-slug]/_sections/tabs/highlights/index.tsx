import { BadgeCheck } from "lucide-react";
import { FC } from "react";

interface TourHighlightsProps {
  // Add your props here
  children?: React.ReactNode;
}

const tourHighlights = [
  "Burj Khalifa - Enjoy breathtaking 360-degree views of Dubai from the 124th floor of the iconic Burj Khalifa.",
  "Museum of The Future - one of the architectural marvel and futuristic building of Dubai.",
  "Team Lab - The multi-sensory art experience will include massive transformative artworks, taking guests on a sensory-rich journey that transcends the ordinary.",
  "Theme Parks - Abu Dhabi's 3 most famous theme parks: the World's first Ferrari Park, Sea World and the adventurous Warner Bros.",
  "Ain Dubai - World's tallest giant observation wheel.",
  "Miracle Garden - one of the world’s most stunning and expansive flower gardens.",
  "Shop to your heart’s content at Gold Souk & Deira city center.",
  "Get marveled at the amazing architecture at the world famous Shaikh Zayed mosque.",
  "Enjoy the famous Belly Dance show with dinner.",
  "Pass by the Atlantis and Dubai Marina area.",
];

const TourHighlights: FC<TourHighlightsProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      {tourHighlights.map((highlight) => (
        <div key={highlight} className="flex gap-3 items-center">
          <BadgeCheck
            className="stroke-primary stroke-[1.5] shrink-0"
            size={20}
          />
          {/* Add Rich Text Here */}

          <p className="text-muted-foreground">{highlight}</p>
        </div>
      ))}
    </div>
  );
};

export default TourHighlights;
