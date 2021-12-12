Code.compile_file(Path.join([__ENV__.file], ["../../../utils/utils.exs"]))

defmodule Challenge do
  @moduledoc false

  def first_result(input) do
    input
    |> parse_input
    |> build_cave_states
    |> explore("start")
  end

  def second_result(input) do
    input
    |> parse_input
    |> build_cave_states
    |> explore("start", 2)
  end

  defp explore(states, cave, max_sm_cave_visits \\ 1, seen_sm_cave \\ false)
  defp explore(_states, "end", _max_sm_cave_visits, _seen_sm_cave), do: 1

  defp explore(states, cave, max_sm_cave_visits, seen_sm_cave) do
    {adjacencies, visited} = Map.get(states, cave)

    cave
    |> updated_visited_count(visited, seen_sm_cave, max_sm_cave_visits)
    |> case do
      nil ->
        0

      new_visited_count ->
        updated_states = Map.put(states, cave, {adjacencies, new_visited_count})

        Enum.reduce(
          adjacencies,
          0,
          &(&2 + explore(updated_states, &1, max_sm_cave_visits, seen_sm_cave || visited > 0))
        )
    end
  end

  defp updated_visited_count(cave, seen_count, seen_sm_cave, max_sm_cave_visits \\ 1)
  defp updated_visited_count(_cave, 1, _, 1), do: nil
  defp updated_visited_count(_cave, 2, _seen_sm_cave, 2), do: nil
  defp updated_visited_count(_cave, 1, true, 2), do: nil

  defp updated_visited_count(cave, seen_count, _seen_sm_cave, _max_sm_cave_visits),
    do: if(String.downcase(cave) == cave, do: seen_count + 1, else: 0)

  defp build_cave_states(adjacencies) do
    Enum.reduce(adjacencies, %{}, fn [left, right], acc ->
      left_state = Map.get(acc, left, {[], 0})
      right_state = Map.get(acc, right, {[], 0})

      updated_left_state = maybe_add_to_adjacencies(right, left_state)
      updated_right_state = maybe_add_to_adjacencies(left, right_state)

      acc
      |> Map.put(left, updated_left_state)
      |> Map.put(right, updated_right_state)
    end)
  end

  defp maybe_add_to_adjacencies("start", state), do: state
  defp maybe_add_to_adjacencies(cave, state), do: {[cave | elem(state, 0)], elem(state, 1)}

  defp parse_input(input), do: Enum.map(input, &String.split(&1, "-"))
end

Utils.run(&Challenge.first_result/1, __ENV__.file, "Q1")
Utils.run(&Challenge.second_result/1, __ENV__.file, "Q2")
