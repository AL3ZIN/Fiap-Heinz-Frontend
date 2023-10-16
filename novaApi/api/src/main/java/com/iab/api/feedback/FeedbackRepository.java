package com.iab.api.feedback;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    Page<Feedback> findAllByAtivoTrue(Pageable paginacao);

    int countByTipoAndAtivo(TipoFeedback tipo, Boolean ativo);
}
