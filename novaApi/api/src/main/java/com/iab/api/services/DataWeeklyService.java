package com.iab.api.services;

import com.iab.api.dtos.DataWeeklyOverviewDTO;
import com.iab.api.models.Comentario;
import com.iab.api.repositories.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Calendar;
import java.util.List;

@Service
public class DataWeeklyService {

    @Autowired
    private ComentarioRepository comentarioRepository;

    public DataWeeklyOverviewDTO getWeeklyOverview() {
        // Obter todos os comentários desta semana
        List<Comentario> weeklyComments = comentarioRepository.findAllByDataFeedBetween(getStartOfWeek(),
                getEndOfWeek());

        int[] envCounts = new int[7];
        int[] socCounts = new int[7];
        int[] govCounts = new int[7];
        int[] genCounts = new int[7];

        for (Comentario comment : weeklyComments) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(comment.getDataFeed());
            int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK) - 2; // -2 porque queremos que segunda-feira seja 0.
            if (dayOfWeek == -1) { // Se for domingo, ajustar o índice para 6
                dayOfWeek = 6;
            }
            switch (comment.getTipo()) {
                case ENVIRONMENT:
                    envCounts[dayOfWeek]++;
                    break;
                case SOCIAL:
                    socCounts[dayOfWeek]++;
                    break;
                case GOVERNANCE:
                    govCounts[dayOfWeek]++;
                    break;
                case GENERAL:
                    genCounts[dayOfWeek]++;
                    break;
                default:
                    break;
            }
        }

        // Retorna o DTO com os contadores apropriados
        return new DataWeeklyOverviewDTO(envCounts, socCounts, govCounts, genCounts);
    }

    private Date getStartOfWeek() {
        Calendar cal = Calendar.getInstance();
        while (cal.get(Calendar.DAY_OF_WEEK) != Calendar.MONDAY) {
            cal.add(Calendar.DAY_OF_MONTH, -1);
        }
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        System.out.println("Day of Week: " + cal.getTime());
        return cal.getTime();
    }

    private Date getEndOfWeek() {
        Calendar cal = Calendar.getInstance();
        while (cal.get(Calendar.DAY_OF_WEEK) != Calendar.SUNDAY) {
            cal.add(Calendar.DAY_OF_MONTH, 1);
        }
        cal.set(Calendar.HOUR_OF_DAY, 23);
        cal.set(Calendar.MINUTE, 59);
        cal.set(Calendar.SECOND, 59);
        cal.set(Calendar.MILLISECOND, 999);
        System.out.println("Day of FWeek: " + cal.getTime());
        return cal.getTime();
    }

}
