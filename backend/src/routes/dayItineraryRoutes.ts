import express from 'express';
import { createDayItineraryItem, getAllDayItineraryItemsForTour, getSingleDayItineraryItem, updateDayItineraryItem, deleteDayItineraryItem } from '../controllers/dayItineraryController';
import { protect } from '../middlewares/auth-middleware';

const router = express.Router();

router.route('/:tourId/itinerary').post(protect, createDayItineraryItem).get(protect, getAllDayItineraryItemsForTour);
router.route('/:tourId/itinerary/:id').get(protect, getSingleDayItineraryItem).patch(protect, updateDayItineraryItem).delete(protect, deleteDayItineraryItem);

export default router;