package com.iab.api.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iab.api.entities.Feedback;
import com.iab.api.repositorio.Repositorio;

@RestController
@CrossOrigin
public class ProductController {

   @Autowired
   private Repositorio acao;

   
   @GetMapping("/hello")
   public String hello(){
      return "Olá";
   }
   @GetMapping("/contador/total")
   public long numeroFeedbacks() {
      return acao.count();
   }

   @GetMapping("/contador/tipofeedback/{codigo}")
   public int contadorTipoFeedback(@PathVariable String codigo) {

      return acao.countByTipo(codigo);
   }

   @GetMapping("/contador/rating")
   public ArrayList<Integer> contadorRating() {
      ArrayList<Integer> lista = new ArrayList<Integer>();

      int nPositive = acao.countByRating("Positive");
      int nNeutral = acao.countByRating("Neutral");
      int nNegative = acao.countByRating("Negative");

      lista.add(nPositive);
      lista.add(nNeutral);
      lista.add(nNegative);

      return lista;
   }

   @GetMapping("/math/nps")
   public double MathRating() {
      int nPositve = acao.countByRating("Positive");
      int nNeutral = acao.countByRating("Neutral");
      int nNegative = acao.countByRating("Negative");
      double NPS = (((double) nPositve / (nPositve + nNeutral + nNegative))
            - ((double) nNegative / (nPositve + nNeutral + nNegative))) * 100;
      return Math.round(NPS);
   }

   @GetMapping("/graph/rating/labels")
   public String[] graphRatingLabel() {
      SimpleDateFormat sdf = new SimpleDateFormat("MMM");
]

      String[] labels = new String[6];

      for (int i = 0; i < 6; i++) {
         Calendar meses = Calendar.getInstance();
         meses.add(Calendar.MONTH, -i);
         System.out.println(meses.get(Calendar.MONTH));
         String mes = sdf.format(meses.getTime());
         mes = mes.substring(0, 1).toUpperCase().concat(mes.substring(1));
         mes = mes.substring(0, 3);
         labels[5 - i] = mes;
      }

      return labels;
   }

   @GetMapping("/graph/rating/data")
   public ArrayList<int[]> graphRatingData() {

      ArrayList<int[]> lista = new ArrayList<>();

      int countPs[] = new int[6];
      int countNt[] = new int[6];
      int countNg[] = new int[6];

      for (int i = 0; i < 6; i++) {

         Calendar m1s = Calendar.getInstance();
         Calendar m1f = Calendar.getInstance();

         int datas;
         int dataf;

         m1s.add(Calendar.MONTH, -i);
         int anos = m1s.get(Calendar.YEAR) * 10000;
         int mess = (m1s.get(Calendar.MONTH) + 1) * 100;
         int dias = m1s.getActualMinimum(Calendar.DAY_OF_MONTH);

         m1f.add(Calendar.MONTH, -i);
         int anof = m1f.get(Calendar.YEAR) * 10000;
         int mesf = (m1f.get(Calendar.MONTH) + 1) * 100;
         int diaf = m1f.getActualMaximum(Calendar.DAY_OF_MONTH);

         datas = anos + mess + dias;
         dataf = anof + mesf + diaf;

         System.out.println(datas + " " + dataf);
         countPs[5 - i] = acao.countByDataFeedBetweenAndRating(datas, dataf, "Positive");
         countNt[5 - i] = acao.countByDataFeedBetweenAndRating(datas, dataf, "Neutral");
         countNg[5 - i] = acao.countByDataFeedBetweenAndRating(datas, dataf, "Negative");
      }
      ;

      lista.add(countPs);
      lista.add(countNt);
      lista.add(countNg);

      return lista;
   }

   @GetMapping("/graph/tipo/data")
   public ArrayList<int[]> graphTipoData() {
      Calendar dds = Calendar.getInstance();

      ArrayList<int[]> lista = new ArrayList<>();

      int[] datasddsE = new int[5];
      int[] datasddsS = new int[5];
      int[] datasddsG = new int[5];

      
      int ndds = dds.get(Calendar.DAY_OF_WEEK);
      System.out.println("ndds: " + ndds);
      if (ndds == 7 || ndds == 1) {
         for (int i = 0; i < 5; i++) {

            Calendar dds1 = Calendar.getInstance();

            int data;
            int wknd;

            if (ndds == 7) {
               wknd = 1;
            } else {
               wknd = 2;
            }
            dds1.add(Calendar.MONTH, 1);
            dds1.add(Calendar.DAY_OF_MONTH, (wknd + i) * -1);

            int ano = dds1.get(Calendar.YEAR) * 10000;
            int mes = dds1.get(Calendar.MONTH) * 100;
            int dia = dds1.get(Calendar.DAY_OF_MONTH);

            data = ano + mes + dia;

            System.out.println(data);
            datasddsE[4 - i] = acao.countByDataFeedAndTipo(data, "Environment");
            datasddsS[4 - i] = acao.countByDataFeedAndTipo(data, "Social");
            datasddsG[4 - i] = acao.countByDataFeedAndTipo(data, "Governance");
         }

      } else {
         for (int i = 0; i < ndds - 1; i++) {

            Calendar dds1 = Calendar.getInstance();
            dds1.add(Calendar.MONTH, 1);
            dds1.add(Calendar.DAY_OF_MONTH, -1);
            int data;

            dds1.add(Calendar.DAY_OF_MONTH, -i);
            int ano = dds1.get(Calendar.YEAR) * 10000;
            int mes = dds1.get(Calendar.MONTH) * 100;
            int dia = dds1.get(Calendar.DAY_OF_MONTH);

            data = ano + mes + dia;

            System.out.println("Data " + data);
            datasddsE[i] = acao.countByDataFeedAndTipo(data, "Environment");
            datasddsS[i] = acao.countByDataFeedAndTipo(data, "Social");
            datasddsG[i] = acao.countByDataFeedAndTipo(data, "Governance");
         }
      }

      lista.add(datasddsE);
      lista.add(datasddsS);
      lista.add(datasddsG);

      return lista;
   }

   @GetMapping("/math/progressbar")
   public ArrayList<Double> getprogressBar() {
      ArrayList<Double> lista = new ArrayList<>();

      int nPositve = acao.countByRating("Positive");
      int nNeutral = acao.countByRating("Neutral");
      int nNegative = acao.countByRating("Negative");
      int total = nPositve + nNeutral + nNegative;

      System.out.println(nPositve);
      System.out.println(nNeutral);
      System.out.println(nNegative);

      double percentPositive = Math.round(((double) nPositve / total) * 100);
      double percentNeutral = Math.round(((double) nNeutral / total) * 100);
      double percentNegative = Math.round(((double) nNegative / total) * 100);

      System.out.println(percentPositive);
      System.out.println(percentNeutral);
      System.out.println(percentNegative);

      lista.add(percentPositive);
      lista.add(percentNeutral);
      lista.add(percentNegative);

      return lista;
   }

   @GetMapping("/find/top/datafeed")
   public List<Feedback> getTopDataFeed() {
      return acao.findTop6OrderByDataCadastroDesc();
   }

   @GetMapping("/contador/ranking")
   public String[][] getRankingCanal() {

      String[][] arrayString = new String[3][2];

      int[] lista = new int[3];

      int fc = 0;
      int tw = 1;
      int inst = 2;

      int nFacebook = acao.countByCanal("Facebook");
      int nTwitter = acao.countByCanal("Twitter");
      int nInstagram = acao.countByCanal("Instagram");

      lista[fc] = nFacebook;
      lista[tw] = nTwitter;
      lista[inst] = nInstagram;

      if (lista[fc] > lista[tw] && lista[fc] > lista[inst]) {
         arrayString[0][0] = "Facebook";
         arrayString[0][1] = String.valueOf(lista[fc]);
         if (lista[tw] > lista[inst]) {
            arrayString[1][0] = "Twitter";
            arrayString[1][1] = String.valueOf(lista[tw]);

            arrayString[2][0] = "Instagram";
            arrayString[2][1] = String.valueOf(lista[inst]);
         } else {
            arrayString[2][0] = "Twitter";
            arrayString[2][1] = String.valueOf(lista[tw]);

            arrayString[1][0] = "Instagram";
            arrayString[1][1] = String.valueOf(lista[inst]);
         }
      }

      else if (lista[tw] > lista[fc] && lista[tw] > lista[inst]) {
         arrayString[0][0] = "Twitter";
         arrayString[0][1] = String.valueOf(lista[tw]);
         if (lista[fc] > lista[inst]) {
            arrayString[1][0] = "Facebook";
            arrayString[1][1] = String.valueOf(lista[fc]);

            arrayString[2][0] = "Instagram";
            arrayString[2][1] = String.valueOf(lista[inst]);
         } else {
            arrayString[2][0] = "Facebook";
            arrayString[2][1] = String.valueOf(lista[fc]);

            arrayString[1][0] = "Instagram";
            arrayString[1][1] = String.valueOf(lista[inst]);
         }
      } else if (lista[inst] > lista[fc] && lista[inst] > lista[tw]) {
         arrayString[0][0] = "Instagram";
         arrayString[0][1] = String.valueOf(lista[inst]);
         if (lista[fc] > lista[tw]) {
            arrayString[1][0] = "Facebook";
            arrayString[1][1] = String.valueOf(lista[fc]);

            arrayString[2][0] = "Twitter";
            arrayString[2][1] = String.valueOf(lista[tw]);
         } else {
            arrayString[2][0] = "Facebook";
            arrayString[2][1] = String.valueOf(lista[fc]);

            arrayString[1][0] = "Twitter";
            arrayString[1][1] = String.valueOf(lista[tw]);
         }
      }

      return arrayString;

   }

   @GetMapping("find/all/page={npage}")
   public List<Feedback> getPagination(@PathVariable Integer npage) {
      Sort sort = Sort.by("dataCadastro").descending();
      Pageable pageable = PageRequest.of(npage, 10, sort);
      return acao.findAll(pageable);
   }
}