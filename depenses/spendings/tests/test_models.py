from django.db.utils import IntegrityError
from djmoney.money import Money
import pytest

from spendings.models import (
    Room,
    Member,
    Spending,
    Dept,
    Settlement,
)


def test_can_create_room():
    room = Room(name="room name", currency="USD")
    assert room.name == "room name"
    assert room.currency == "USD"


@pytest.mark.django_db
def test_cant_save_duplicate_member():
    room = Room.objects.create(name="room name", currency="USD")
    Member.objects.create(room=room, name="testname")

    with pytest.raises(IntegrityError) as e_info:
        Member.objects.create(room=room, name="testname")
        assert "UNIQUE constraint failed" in str(e_info.value)


@pytest.mark.django_db
def test_can_create_room_with_2_members():
    room = Room.objects.create(name="room name", currency="USD")
    member_1 = Member.objects.create(room=room, name="user_1")
    member_2 = Member.objects.create(room=room, name="user_2")

    assert room.member_set.count() == 2
    assert member_1.room == member_2.room


def test_can_create_spending():
    room = Room(name="room name", currency="USD")
    member = Member(room=room, name="testname")

    spending = Spending(member=member, title="some title", amount=Money(42, "USD"))

    assert spending.title == "some title"
    assert spending.member.room.name == "room name"
    assert spending.member.name == "testname"


@pytest.mark.django_db
def test_can_create_dept():
    room = Room.objects.create(name="room name", currency="USD")
    member_1 = Member.objects.create(room=room, name="user_1")
    member_2 = Member.objects.create(room=room, name="user_2")

    dept = Dept(title="dept", to_member=member_1, from_member=member_2, amount=Money(10, "USD"))

    assert dept.title == "dept"
    assert dept.from_member.name == "user_2"
    assert dept.to_member.name == "user_1"
    assert dept.amount.amount == 10


@pytest.mark.django_db
def test_can_create_settlement():
    room = Room.objects.create(name="room name", currency="USD")
    member_1 = Member.objects.create(room=room, name="user_1")
    member_2 = Member.objects.create(room=room, name="user_2")

    settlement = Settlement(member=member_1, settlement_with_member=member_2)

    assert settlement.member.room.name == "room name"
    assert settlement.member.name == "user_1"
    assert settlement.settlement_with_member.name == "user_2"


@pytest.mark.django_db
def test_cant_create_dept_from_and_to_same_member():
    room = Room.objects.create(name="room name", currency="USD")
    member = Member.objects.create(room=room, name="user")

    with pytest.raises(IntegrityError) as e_info:
        Dept.objects.create(from_member=member, to_member=member, amount=Money(10, "USD"), title="dept")
        assert "IntegrityError: CHECK constraint failed" in str(e_info.value)
