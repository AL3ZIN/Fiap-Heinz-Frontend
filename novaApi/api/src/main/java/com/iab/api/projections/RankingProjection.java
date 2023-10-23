package com.iab.api.projections;

import com.iab.api.enums.Canal;

public interface RankingProjection {
    Canal getCanal();
    Long getQtdComentarios();
}