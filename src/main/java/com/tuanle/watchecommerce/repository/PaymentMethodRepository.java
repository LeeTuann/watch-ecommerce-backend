package com.tuanle.watchecommerce.repository;

import com.tuanle.watchecommerce.entity.PaymentMethod;
import com.tuanle.watchecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
    List<PaymentMethod> findByUser(User user);
    List<PaymentMethod> findByUserId(Long userId);
}
