package com.smartdairy.repository;

import com.smartdairy.model.Cow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CowRepository extends JpaRepository<Cow, Long> {
    Optional<Cow> findByTagNumber(String tagNumber);
    List<Cow> findByHealthStatus(String healthStatus);
    List<Cow> findByLactationStage(String lactationStage);
}
