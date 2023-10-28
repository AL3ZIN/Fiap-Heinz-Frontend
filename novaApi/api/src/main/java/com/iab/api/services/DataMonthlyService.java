package com.iab.api.services;

import com.iab.api.dtos.MonthlyRatingOverviewDTO;
import com.iab.api.enums.Rating;
import com.iab.api.repositories.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.TextStyle;
import java.util.Date;
import java.util.Locale;

@Service
public class DataMonthlyService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    public MonthlyRatingOverviewDTO getMonthlyOverview() {
        LocalDate todayDate = LocalDate.now();
        MonthlyRatingOverviewDTO monthlyOverviews;
         Long[] positiveCount = new Long[6];
         Long[] negativeCount =new Long[6];
         Long[] neutralCount = new Long[6];
         String[] mes = new String[6];

        for (int i = 5; i >= 0; i--) {
            LocalDate firstDayOfMonth = todayDate.withDayOfMonth(1);
            LocalDate lastDayOfMonth = todayDate.withDayOfMonth(todayDate.lengthOfMonth());
            
            Date startDate = Date.from(firstDayOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant());
            Date endDate = Date.from(lastDayOfMonth.atTime(23, 59, 59).atZone(ZoneId.systemDefault()).toInstant());

            positiveCount[i] = comentarioRepository.countByRatingAndDataFeedBetween(Rating.POSITIVE, startDate, endDate);
            neutralCount[i] = comentarioRepository.countByRatingAndDataFeedBetween(Rating.NEUTRAL, startDate, endDate);
            negativeCount[i] = comentarioRepository.countByRatingAndDataFeedBetween(Rating.NEGATIVE, startDate, endDate);

            mes[i] = getMonthName(todayDate);
            
            
            todayDate = todayDate.minusMonths(1); // Move to the previous month for the next iteration
        }
        monthlyOverviews = new MonthlyRatingOverviewDTO(positiveCount, negativeCount, neutralCount, mes);
        
        return monthlyOverviews;
    }

    private String getMonthName(LocalDate date) {
        String monthName = date.getMonth().getDisplayName(TextStyle.FULL, Locale.forLanguageTag("pt-BR"));
        return monthName.substring(0, 1).toUpperCase() + monthName.substring(1).toLowerCase();
    }

}
